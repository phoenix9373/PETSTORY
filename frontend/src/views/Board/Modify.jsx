import React, { Component } from 'react';
import axios from 'axios';
import { request } from '../../utils/axios';
import { confirmAlert } from 'react-confirm-alert';

// Components
import InputModify from '../../components/ComponentUI/InputModify';
import TextAreaModify from '../../components/ComponentUI/TextAreaModify';

// Alarm
import toast, { Toaster } from 'react-hot-toast';

// Css
import { FaCat } from 'react-icons/fa';
import { MdCancel, MdCloudUpload } from 'react-icons/md';
import './Modify.scss';

// Cartoonize
import {
  CartoonWorkerManager,
  generateCartoonDefaultConfig,
  generateDefaultCartoonParams,
} from '@dannadori/white-box-cartoonization-worker-js';

export default class Modify extends Component {
  fileObj = [];
  fileArray = [];
  fileArrayFirst = null;
  titleRef = React.createRef();
  contextRef = React.createRef();
  hashtagRef = React.createRef();

  constructor(props) {
    super(props);
    this.state = {
      title: '',
      context: '',
      hashtags: [],
      file: [],
      fileTrans: [],
      keyword: '',
      results: [],
      cursor: 0,
      feedItem: props.location.state,
    };
    this.submit = this.submit.bind(this);
    this.pushAxios = this.pushAxios.bind(this);
    this.uploadMultipleFiles = this.uploadMultipleFiles.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.onDragOver = this.onDragOver.bind(this);
    this.handleRemoveItem = this.handleRemoveItem.bind(this);
    this.hashtagsubmitHandler = this.hashtagsubmitHandler.bind(this);
    this.hashtagAutocomplete = this.hashtagAutocomplete.bind(this);
    this.hashtagBlurHandler = this.hashtagBlurHandler.bind(this);
    this.hashtagOnkeyDown = this.hashtagOnkeyDown.bind(this);
    this.previewHandler = this.previewHandler.bind(this);
    this.onhandletitle = this.onhandletitle.bind(this);
    this.onhandlecontext = this.onhandlecontext.bind(this);
  }
  componentWillMount() {
    if (this.state.file.length === 0 && this.state.feedItem) {
      for (let i = 0; i < this.state.feedItem.files.length; i++) {
        this.fileArray.push({
          URL: this.state.feedItem.files[i].imgFullPath,
          id: i + Date.now(),
          Obj: this.state.feedItem.files[i],
        });
      }
      if (!this.fileArray[0]) {
        return;
      }
      this.fileArrayFirst = this.fileArray[0].URL;
      this.setState({ file: this.fileArray });
    }
    if (this.state.hashtags.length === 0 && this.state.feedItem) {
      const boardHashtags = this.state.feedItem.boardHashtags;
      this.setState({
        hashtags: boardHashtags.map((item) => item.hashtagName),
      });
    }
    if (this.state.title.length === 0 && this.state.feedItem) {
      this.setState({ title: this.state.feedItem.title });
    }
    if (this.state.context.length === 0 && this.state.feedItem) {
      this.setState({ context: this.state.feedItem.context });
    }
  }
  onhandletitle(value) {
    const title = value;
    this.setState({ title });
  }
  onhandlecontext(value) {
    const context = value;
    this.setState({ context });
  }
  submit = () => {
    confirmAlert({
      title: '수정하기',
      message: '정말 수정하시겠습니까?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => this.pushAxios(),
        },
        {
          label: 'No',
          // onClick: () => alert('Click No'),
        },
      ],
    });
  };
  pushAxios(e) {
    // e.preventDefault();
    if (!this.titleRef.current.value) {
      toast.error('제목을 입력하세요');
      return;
    }
    if (!this.contextRef.current.value) {
      toast.error('내용을 입력하세요');
      return;
    }
    if (this.fileArray.length === 0) {
      toast.error('사진을 등록해주세요');
      return;
    }
    const formData = new FormData();
    formData.append('profileId', localStorage.getItem('profileId'));
    formData.append('title', this.titleRef.current.value);
    formData.append('context', this.contextRef.current.value);
    formData.append('hashtags', this.state.hashtags);
    formData.append('imgFullPaths', this.imgFullPaths);
    for (const i of this.fileArray) {
      const img = i.Obj;
      formData.append('files', img);
    }
    // axios
    request(
      'PUT',
      `/api/board/update/${this.state.feedItem.boardId}`,
      formData,
    );
    this.titleRef.current.value = '';
    this.contextRef.current.value = '';
    this.hashtagRef.current.value = '';
    // this.props.history.push('/');
    window.location.href = '/';
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
  hashtagBlurHandler(e) {
    this.setState({ results: [] });
  }

  hashtagAutocomplete(e) {
    e.preventDefault();
    const temp = this.hashtagRef.current.value;
    this.setState({
      cursor: 0,
    });
    if (temp) {
      axios
        .get(`/api/hashtag/findOne/${temp}`)
        .then((res) => {
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
      <>
        <Toaster
          position="top-center"
          reverseOrder={true}
          toastOptions={{
            duration: 1000,
            style: {
              border: '1px solid #713200',
              padding: '16px',
              margin: '10vh',
              color: '#713200',
            },
          }}
        />
        <div className="contaniner">
          <div className="headers">
            <div className="headers__item" onClick={this.submit}>
              <FaCat className="headers__item__icon" />글 수정하기
            </div>
          </div>
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
                  <>
                    <img className="img-card-image" src={this.fileArrayFirst} />
                  </>
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
                <InputModify
                  initialValue={this.state.title}
                  titleRef={this.titleRef}
                  handletitle={this.onhandletitle}
                ></InputModify>
                <label htmlFor="title" className="form__label title">
                  제목
                </label>
              </div>
              <div className="form__group field">
                <TextAreaModify
                  initialValue={this.state.context}
                  contextRef={this.contextRef}
                  handlecontext={this.onhandlecontext}
                ></TextAreaModify>
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
                  onBlur={this.hashtagBlurHandler}
                  onChange={this.hashtagAutocomplete}
                  onKeyPress={this.hashtagsubmitHandler}
                  onKeyDown={this.hashtagOnkeyDown}
                />
                <label htmlFor="hashtag" className="form__label title">
                  해쉬태그
                </label>
                {this.state.results !== [] ? (
                  <ul htmlFor="hashtag" className="hashtag__suggest__wrapper">
                    {this.state.results.map((item, idx) => (
                      <li
                        key={idx * 123456789}
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
          <ul className="img-list">
            {this.fileArray.length === 0 ? (
              <div className="preview__holder">이미지 프리뷰가 나올 공간</div>
            ) : (
              ''
            )}
            {this.fileArray.map((item, index) => (
              <li
                key={index * 987}
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
        </div>
      </>
    );
  }
}
