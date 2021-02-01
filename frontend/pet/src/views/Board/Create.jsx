import React from "react";
import ImageUploading from "react-images-uploading";
import upload from "../../assets/upload.PNG";
// import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import "./Create.css";
import axios from 'axios';

export default function Create() {
  const titleRef = React.createRef();
  const contentRef = React.createRef();
  const [images, setImages] = React.useState([]);
  // const [title, setTitle] = React.useState('');
  // const [content, setContent] = React.useState('');
  const maxNumber = 69;
  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
    // axios 통신하는 위치
  };
  const onSubmit = (event) => {
    event.preventDefault();
    const obj = {
      title: titleRef.current.value,
      content: contentRef.current.value,
      imageList: images,

    };
    console.log(obj);
    axios.post('http://localhost:8080/board/create', obj)
        .then(res => console.log(res.data));
    titleRef.current.value = '';
    contentRef.current.value = '';
    setImages('');
  };

  return (
    <form onSubmit={onSubmit}>
      <ImageUploading
        multiple
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
        dataURLKey="data_url"
      >
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps,
        }) => (
          // write your building UI
          <div className={isDragging ? "imageupload active" : "imageupload"}
          {...dragProps}>
            <button
              className="uploadimg"
              onClick={onImageUpload}
            >
              <img src={upload} alt="왜"/>

            </button>
            <button onClick={onImageRemoveAll}>RESET</button>
            &nbsp;
            <Grid container spacing={1}>
            {imageList.map((image, index) => (
              <Grid key={index} className="image-item">
                <img src={image.data_url} alt="" width="100" />
                <div className="image-item__btn-wrapper">
                  <button onClick={() => onImageUpdate(index)}><i className="fas fa-pen color-yellow"></i></button>
                  <button onClick={() => onImageRemove(index)}><i className="fas fa-times-circle color-red"></i></button>
                </div>
              </Grid>
            ))}
            </Grid>

          </div>

        )}

      </ImageUploading>
      <div className="text-div">
          <input ref={titleRef} type="text" placeholder="제목을 입력하세요"/>
          <input ref={contentRef} type="text" placeholder="내용을 입력하세요"/>

      </div>
      <button>생성하기</button>
    </form>
  );
}

// const rootElement = document.getElementById("root");
// ReactDOM.render(<Create />, rootElement);
