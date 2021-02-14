import React, { Component } from 'react';
import SearchBar from './SearchBar';
import { createArticle } from '../../_actions/boardAction';
import { MdCancel, MdCloudUpload } from 'react-icons/md';
import { FaCat } from 'react-icons/fa';
import './Create.scss';

export default class Create extends Component {
  fileObj = [];
  fileArray = [];
  fileArrayFirst = null;
  titleRef = React.createRef();
  contextRef = React.createRef();
  constructor(props) {
    super(props);
    this.state = {
      hashtags: [],
      file: [],
      keyword: '',
      results: [],
    };
    this.pushAxios = this.pushAxios.bind(this);
    this.uploadMultipleFiles = this.uploadMultipleFiles.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.onDragOver = this.onDragOver.bind(this);
    this.handleRemoveItem = this.handleRemoveItem.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleInputKeyDown = this.handleInputKeyDown.bind(this);
    this.previewHandler = this.previewHandler.bind(this);
  }

  pushAxios(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append('profileId', localStorage.getItem('profileId'));
    formData.append('title', this.titleRef.current.value);
    formData.append('context', this.contextRef.current.value);
    formData.append('hashtags', this.state.hashtags);
    for (const i of this.fileArray) {
      const img = i.Obj;
      formData.append('files', img);
    }
    // axios
    const axios = createArticle(formData);
    this.titleRef.current.value = '';
    this.contextRef.current.value = '';
    this.props.history.push('/');
  }

  handleDelete(image) {
    if (this.fileArray.length === 1) {
      this.fileArray = [];
      this.fileArrayFirst = null;
      this.setState({ file: this.fileArray });
    } else {
      const fileArray = this.fileArray.filter((item) => item.id !== image.id);
      this.fileArray = fileArray;
      this.fileArrayFirst = this.fileArray[0].URL;
      this.setState({ file: fileArray });
    }
  }

  uploadMultipleFiles(e) {
    e.preventDefault();
    const files = e.target.files;
    for (let i = 0; i < files.length; i++) {
      this.fileArray = [
        ...this.fileArray,
        {
          URL: URL.createObjectURL(files[i]),
          id: i + Date.now(),
          Obj: files[i],
        },
      ];
    }
    if (!this.fileArray[0]) {
      return;
    }
    this.fileArrayFirst = this.fileArray[0].URL;
    this.setState({ file: this.fileArray });
  }

  onDrop(e) {
    e.preventDefault();
    const {
      dataTransfer: { files },
    } = e;
    for (let i = 0; i < files.length; i++) {
      this.fileArray = [
        ...this.fileArray,
        {
          URL: URL.createObjectURL(files[i]),
          id: i + Date.now(),
          Obj: files[i],
        },
      ];
    }
    this.fileArrayFirst = this.fileArray[0].URL;
    this.setState({ file: this.fileArray });
  }

  onDragOver(e) {
    e.preventDefault();
  }

  onSearch = async (text) => {
    let stockData;
    let data;
    try {
      stockData = await fetch(
        `https://financialmodelingprep.com/api/v3/search?query=${text}&limit=10&exchange=NASDAQ&apikey=abf4ef28fc7fd607624d9a8941444c42`,
      );
      data = await stockData.json();
    } catch (err) {
      console.err(err.message);
    }
    this.setState({ results: data });
  };

  updateField = (field, value) => {
    if (field === 'keyword') this.onSearch(value);
    this.setState({ [field]: value });
  };

  handleInputChange(evt) {
    this.setState({ input: evt.target.value });
  }

  handleInputKeyDown(evt) {
    evt.preventDefault();
    if (evt.keyCode === 13) {
      const { value } = evt.target;
      this.setState((state) => ({
        hashtags: [...state.hashtags, value],
        keyword: '',
      }));
    }
  }

  handleRemoveItem(index) {
    return () => {
      this.setState((state) => ({
        hashtags: state.hashtags.filter((item, i) => i !== index),
      }));
    };
  }

  previewHandler(index) {
    if (!this.fileArray[index]) {
      return;
    }
    this.fileArrayFirst = this.fileArray[index].URL;
    this.setState({ file: this.fileArray });
  }

  render() {
    const { suggestions } = this.state;
    const { results, keyword } = this.state;
    return (
      <div className="contaniner">
        <div className="headers">
          <div className="headers__item" onClick={this.pushAxios}>
            <FaCat className="headers__item__icon" />글 작성하기
          </div>
        </div>
        <ul className="img-list">
          {this.fileArray.length === 0 ? (
            <div className="preview__holder">이미지 프리뷰가 나올 공간</div>
          ) : (
            ''
          )}
          {this.fileArray.map((item, index) => (
            <li
              key={item.id}
              onClick={() => this.previewHandler(index)}
              className="img-able-delete"
            >
              <img className="imgPreview" src={item.URL} key={item.id} />
              <div className="iconWrapper">
                <MdCancel
                  className="deleteIcon"
                  onClick={() => this.handleDelete(item)}
                />
              </div>
            </li>
          ))}
        </ul>
        <div
          className="form-card"
          onDrop={this.onDrop}
          onDragOver={this.onDragOver}
        >
          <div className="img-card">
            <label className="label-image" htmlFor="imageUpload">
              <div className="imagedroparea">
                {!this.fileArrayFirst && (
                  <MdCloudUpload className="image-placeholder-icon" />
                )}
                {!this.fileArrayFirst && (
                  <div className="image-placeholder">
                    여기에 이미지를 드래그 하거나 클릭해 주세요
                  </div>
                )}
              </div>
              {this.fileArrayFirst && (
                <img className="img-card-image" src={this.fileArrayFirst} />
              )}
            </label>
            <input
              type="file"
              id="imageUpload"
              style={{ display: 'none' }}
              onChange={this.uploadMultipleFiles}
              multiple
            />
          </div>
          <div className="text-card">
            <div className="form__group field">
              <input
                className="form__field "
                ref={this.titleRef}
                placeholder="title"
                id="name"
                type="input"
                required
              />
              <label htmlFor="title" className="form__label title">
                제목입니다
              </label>
            </div>
            <div className="form__group field">
              <textarea
                className="form__field context"
                ref={this.contextRef}
                placeholder="context"
                id="context"
                type="textarea"
                required
              />
              <label htmlFor="context" className="form__label context">
                내용입니다
              </label>
            </div>
            <SearchBar
              suggestions={suggestions}
              results={results}
              keyword={keyword}
              updateField={this.updateField}
              onhandleInputKeyDown={this.handleInputKeyDown}
              onhandleInputChange={this.handleInputChange}
            />
            <div className="input-tag">
              <ul className="input-tag__tags">
                {this.state.hashtags.map((item, i) => (
                  <li
                    className="input-tag__tags__li"
                    key={i}
                    onClick={this.handleRemoveItem(i)}
                  >
                    {item}
                    <span>+</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
