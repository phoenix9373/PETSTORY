import React, { useState } from "react";
import axios from "axios";
import './app.css';
import Register from "./components/register"
const BASE_URL = "http://localhost:4001";
const titleInputRef =React.createRef();
const contentInputRef =React.createRef();
export default function App() {
  // const [data, setData] = useState({});
  //   fetch('/upload')
  //       .then(res => res.json())
  //       .then(data => setData(data), () => {
  //           console.log('data read : ', data);
  //       })
  const [content, setContent] = useState("");
  const [imgBase64, setImgBase64] = useState("");
  const [imgFile,setImgFile] = useState(null);
  
  const [uploadedImg, setUploadedImg] = useState({
    fileName: "",
    filePath: "",
  });
  const onChange = e => {
    let reader = new FileReader();
    reader.onloadend= () => {
      const base64 = reader.result;
      if (base64) {
        setImgBase64(base64.toString());
      }
    }
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
      setImgFile(e.target.files[0]);
      // console.log(e.target.files[0])
    }
    setContent(e.target.files[0]);
    // console.log(content);
  };
  const onSubmit = e => {
    e.preventDefault();
    const formData = new FormData();
    const title = titleInputRef.current.value;
    // const content = contentInputRef.current.value;
    console.log(title)
    console.log(content)
    formData.append("img", content);
    // formData.append("title",content);
    titleInputRef.current.value=''; 
    contentInputRef.current.value=''; 
    console.log(content,uploadedImg)
    // console.log(formData)
    axios
      .post("/upload", formData)
      .then(res => {
        const { fileName } = res.data;
        // console.log(res)
        setUploadedImg({ fileName, filePath: `${BASE_URL}/img/${fileName}` });
        alert("The file is successfully uploaded");
      })
      .catch(err => {
        console.error(err);
      });
  };
  return (
    <>
    <h1> 글 작성하기</h1> 
      <form onSubmit={onSubmit} className="greybox">
        {uploadedImg ? (
          <>
            <img src= {imgBase64} width="250" height="250" alt=""/>
            <Register uploadedImg={uploadedImg}/>   
          </>
        ) : (
          ""
        )}
        <input type="file" name="imgFile" onChange={onChange} />
        <button className="fas fa-folder-plus" type="submit"></button>
       제목 : <input ref={titleInputRef} type="text" placeholder="제목 입력" id=""/><hr/>
       본문 : <input ref={contentInputRef} type="text" placeholder="본문을 입력하세요"/><hr/>
      </form>
      
    </>
  );
}