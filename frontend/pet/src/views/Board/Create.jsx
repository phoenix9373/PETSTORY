import React, { Component } from 'react';
import { createArticle } from '../../_actions/boardAction';
import { MdCancel, MdCloudUpload } from 'react-icons/md';
import { FaCat } from 'react-icons/fa';
import axios from 'axios';
import './Create.scss';

export default class Create extends Component {
  fileObj = [];
  fileArray = [];
  fileArrayFirst = null;
  titleRef = React.createRef();
  contextRef = React.createRef();
  hashtagRef = React.createRef();
  constructor(props) {
    super(props);
    this.state = {
      hashtags: [],
      file: [],
      keyword: '',
      results: [],
      cursor: 0,
    };
    this.pushAxios = this.pushAxios.bind(this);
    this.uploadMultipleFiles = this.uploadMultipleFiles.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.onDragOver = this.onDragOver.bind(this);
    this.handleRemoveItem = this.handleRemoveItem.bind(this);
    this.hashtagsubmitHandler = this.hashtagsubmitHandler.bind(this);
    this.hashtagAutocomplete = this.hashtagAutocomplete.bind(this);
    this.previewHandler = this.previewHandler.bind(this);
    this.hashtagOnkeyDown = this.hashtagOnkeyDown.bind(this);
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
    this.hashtagRef.current.value = '';
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

  previewHandler(index) {
    if (!this.fileArray[index]) {
      return;
    }
    this.fileArrayFirst = this.fileArray[index].URL;
    this.setState({ file: this.fileArray });
  }

  hashtagsubmitHandler(e) {
    if (e.charCode === 13) {
      const temp = this.hashtagRef.current.value;
      this.setState((state) => ({ results: [] }));
      this.setState((state) => ({
        hashtags: [...state.hashtags, temp],
      }));
      this.hashtagRef.current.value = '';
    }
  }

  handleRemoveItem(index) {
    return () => {
      this.setState((state) => ({
        hashtags: state.hashtags.filter((item, i) => i !== index),
      }));
    };
  }

  hashtagAutocomplete(e) {
    e.preventDefault();
    const temp = this.hashtagRef.current.value;
    if (temp) {
      axios
        .get(`/api/hashtag/findOne/${temp}`)
        .then((res) => {
          console.log(res.data.data);
          this.setState((state) => ({ results: res.data.data }));
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }

  suggestionClickHandler(idx) {
    this.hashtagRef.current.value = this.state.results[idx];
    this.setState((state) => ({ results: [] }));
  }

  hashtagOnkeyDown(e) {
    const { cursor, results } = this.state;
    if (e.keyCode === 13 && results[cursor]) {
      this.hashtagRef.current.value = results[cursor];
      this.setState((state) => ({ results: [] }));
      return;
    }
    if (e.keyCode === 38 && cursor > 0) {
      this.setState((prevState) => ({
        cursor: prevState.cursor - 1,
      }));
    } else if (e.keyCode === 40 && cursor < results.length - 1) {
      this.setState((prevState) => ({
        cursor: prevState.cursor + 1,
      }));
    }
  }

  render() {
    const { cursor } = this.state;
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
                autoComplete="off"
                required
              />
              <label htmlFor="title" className="form__label title">
                제목
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
                내용
              </label>
            </div>
            <ul className="hashtag__container">
              {this.state.hashtags.map((item, i) => (
                <li
                  className="hashtag__item"
                  key={i}
                  onClick={this.handleRemoveItem(i)}
                >
                  #{item}
                </li>
              ))}
            </ul>
            <div className="form__group field">
              <input
                className="form__field "
                placeholder="hashtag"
                ref={this.hashtagRef}
                id="hashtag"
                type="input"
                required
                autoComplete="off"
                onChange={this.hashtagAutocomplete}
                onKeyPress={this.hashtagsubmitHandler}
                onKeyDown={this.hashtagOnkeyDown}
              />
              <label htmlFor="hashtag" className="form__label title">
                해쉬태그
              </label>
              {this.state.results !== [] ? (
                <ul htmlfor="hashtag" className="hashtag__suggest__wrapper">
                  {this.state.results.map((item, idx) => (
                    <li
                      key={item.id}
                      className={
                        cursor === idx
                          ? 'hashtag__suggest__item active'
                          : 'hashtag__suggest__item'
                      }
                      onClick={() => this.suggestionClickHandler(idx)}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              ) : (
                ''
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
