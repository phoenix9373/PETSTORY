import React, { useState } from 'react';
import axios from 'axios';
import './register.css';
import Container from '@material-ui/core/Container';
// import Grid from '@material-ui/core/Grid';

const BASE_URL = 'http://localhost:8080';
const titleInputRef = React.createRef();
const storyInputRef = React.createRef();
export default function Register() {
  const [content, setContent] = useState('');
  const [imgBase64, setImgBase64] = useState('');
  const [imgFile, setImgFile] = useState(null);

  const [uploadedImg, setUploadedImg] = useState({
    fileName: '',
    filePath: '',
  });
  const onChange = (e) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result;
      if (base64) {
        setImgBase64(base64.toString());
      }
    };
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
      setImgFile(e.target.files[0]);
      // console.log(e.target.files[0])
    }
    setContent(e.target.files[0]);
    // console.log(content);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    const title = titleInputRef.current.value;
    const story = storyInputRef.current.value;
    // const content = contentInputRef.current.value;
    console.log(title);
    console.log(story);
    formData.append('img', content);
    // formData.append("title",content);
    titleInputRef.current.value = '';
    storyInputRef.current.value = '';
    console.log(content, uploadedImg);
    // console.log(formData)
    axios
      .post(BASE_URL, formData)
      .then((res) => {
        const { fileName } = res.data;
        // console.log(res)
        setUploadedImg({ fileName, filePath: `${BASE_URL}/img/${fileName}` });
        alert('The file is successfully uploaded');
      })
      .catch((err) => {
        console.error(err);
      });
  };
  return (
    <>
      <h1>새글 작성 PAGE</h1>
      <form onSubmit={onSubmit} className="greybox">
        <Container className="contaniner-background" maxWidth="sm">
          {uploadedImg ? (
            <>
              <img src={imgBase64} width="250" height="250" alt="" />
              {/* <img width="250" height="250" src={uploadedImg.filePath} alt="" /> */}
              {/* <h3>{uploadedImg.fileName}</h3> */}
              <div className="input-center">
                제목 :{' '}
                <input
                  ref={titleInputRef}
                  type="text"
                  placeholder="제목 입력"
                  id=""
                />
                <br />
                본문 :{' '}
                <input
                  ref={storyInputRef}
                  type="text"
                  placeholder="본문을 입력하세요"
                />
              </div>
            </>
          ) : (
            ''
          )}

          <input type="file" name="imgFile" onChange={onChange} />
          <br />
          <div className="button-positon">
            <button className="button-mg" type="submit">
              upload
            </button>
          </div>
        </Container>
      </form>
    </>
  );
}
