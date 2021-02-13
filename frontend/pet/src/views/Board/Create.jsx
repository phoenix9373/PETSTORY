import React, { Component } from 'react';
import SearchBar from './SearchBar';
import axios from 'axios';
import './Create.css';
import { COUNTRIES } from './contries';
// # 시작
const suggestions = COUNTRIES.map((country) => ({
  name: country,
}));
export default class Create extends Component {
    fileObj = [];
    fileArray = [];
    fileArrayFirst = '';
    images = [];
    titleRef = React.createRef();
    contextRef = React.createRef();
    constructor(props) {
        super(props);
        this.state = {
            hashtags: [null],
            focused: false,
            // input: '',
            file: [null],
            keyword: "",
            results: [],
            suggestions,
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleInputKeyDown = this.handleInputKeyDown.bind(this);
        this.handleRemoveItem = this.handleRemoveItem.bind(this);
        this.uploadFiles = this.uploadFiles.bind(this);
        this.onDrop = this.onDrop.bind(this);
        this.onDragOver = this.onDragOver.bind(this);
    }
    this.setState({ img: this.tileObj });
    console.log(this.fileArray);
    this.setState({ file: this.fileArray });
  }

  uploadFiles(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append('profileId', localStorage.getItem('profileId'));
    formData.append('title', this.titleRef.current.value);
    formData.append('context', this.contextRef.current.value);
    formData.append('hashtags', this.state.hashtags);
    console.log(this.fileArray);
    for (const i of this.fileArray) {
      const img = i.Obj;
      formData.append('files', img);
    }
    // console.log(this.state.file);
    axios
      .post('/api/board/create', formData, {})
      .then((response) => console.log(response))
      .then((result) => console.log(result))
      .catch((error) => console.error('error', error));
    this.titleRef.current.value = '';
    this.contextRef.current.value = '';
  }
  handleDelete(image) {
    console.log(this.fileArray);
    const fileArray = this.fileArray.filter((item) => item.id !== image.id);
    this.fileArray = fileArray;
    this.setState({ file: fileArray });
  }
  handleInputChange(evt) {
    this.setState({ input: evt.target.value });
  }

  handleInputKeyDown(evt) {
    if (evt.keyCode === 13) {
      const { value } = evt.target;
      evt.preventDefault();

      this.setState((state) => ({
        hashtags: [...state.hashtags, value],
        keyword: '',
      }));
    }

    onDrop(e) {
      e.preventDefault();
      const {dataTransfer: {files}} = e;
      const fileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
      this.setState({ file: files});

      this.images = files;
        this.fileObj = files;
        for (let i = 0; i < this.fileObj.length; i++) {
            this.fileArray = [
            ...this.fileArray,
            {URL: URL.createObjectURL(this.fileObj[i]), id: i + Date.now(), Obj: this.fileObj[i]},
        ];
        }
        this.fileArrayFirst = this.fileArray[0].URL;
        this.setState({img: this.tileObj});
        console.log(this.fileArray);
        this.setState({ file: this.fileArray});
    }
    onDragOver(e) {
      e.preventDefault();
    }

    // matchName = (name, keyword) => {
    //   const keyLen = keyword.length;
    //   name = name.toLowerCase().substring(0, keyLen);
    //   if (keyword === "") return false;
    //   return name === keyword.toLowerCase();
    // };

    onSearch = async text => {
      let stockData;
      let data;
      try {
        console.log(COUNTRIES);
        stockData = await fetch(
          `https://financialmodelingprep.com/api/v3/search?query=${text}&limit=10&exchange=NASDAQ&apikey=abf4ef28fc7fd607624d9a8941444c42`,
        );
        data = await stockData.json();
      } catch (err) {
        console.log(err.message);
      }
      // console.log(data);
      this.setState({ results: data });
    };

    updateField = (field, value) => {
      if (field === "keyword") this.onSearch(value);
      this.setState({ [field]: value });
    };

    render() {
      const {suggestions} = this.state;
      const { results, keyword } = this.state;
        return (
            <div className="contaniner">
              <header className="header"> 글 작성하기</header>
              <div className="img-list">
                {/* <SingleLineGridList fileArray={this.fileArray} */}
                {/* Ondelete={(item) => this.handleDelete(item)}/> */}
                  {(this.fileArray || {}).map(item => (
                    <li key={item.id} className="img-able-delete">
                      <img src={item.URL} key={item.id} width="100px" height="100px" alt="..." />
                      <span onClick={() => this.handleDelete(item)}>삭제</span>
                    </li>

                  ))}
              </div>
            <form onSubmit={this.uploadFiles} className="form-card">
              <label htmlFor="image-loader">
                <div className="img-card" onDrop={this.onDrop} onDragOver={this.onDragOver}>
                  <img className="img-card-image" src={this.fileArrayFirst} alt=""/>
                </div>
              </label>
              <input type="file" id="image-upload" style={{ display: "none"}} onChange={this.uploadMultipleFiles} multiple />
              <hr/>
              <div className="text-card">
                <div className="title-form">
                  <input className="title-input" ref={this.titleRef} placeholder="제목을 입력하시오" type="text"/>
                  <input className="content-input" ref={this.contextRef} placeholder="내용을 입력하시오" type="text"/>
                </div>

                <div className="input-tag">
                  <ul className="input-tag__tags">
                      {(this.state.hashtags).map((item, i) =>
                        <li className="input-tag__tags__li" key={i} onClick={this.handleRemoveItem(i)}>
                          {item}
                          <span>+</span>
                        </li>,
                      )}
                  </ul>
                    <SearchBar
                    suggestions={suggestions}
                    results={results}
                    keyword={keyword}
                    updateField={this.updateField}
                    onhandleInputKeyDown={this.handleInputKeyDown}
                    onhandleInputChange={this.handleInputChange}

                  />
                </div>
                <button>Upload</button>
              </div>

            </form >
          </div>
        );
    }
}
