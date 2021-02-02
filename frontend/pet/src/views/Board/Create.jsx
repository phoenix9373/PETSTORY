import React from "react";
import ImageUploading from "react-images-uploading";
import upload from "../../assets/upload.PNG";
// import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import "./Create.css";
import axios from 'axios';

export default function Create() {
  const titleRef = React.createRef();
  const contextRef = React.createRef();
  const [images, setImages] = React.useState([]);
  const maxNumber = 69;
  const files = new FormData();
  const onlistChange = (imageList, addUpdateIndex) => {
    // data for submit
    for (const image of imageList) {
      files.append('files', image.file);
    }
    // axios 통신하는 위치
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const request = {
      title: titleRef.current.value,
      context: contextRef.current.value,
    };
    files.append('title', request.title);
    files.append('context', request.context);
    axios.post("/api/board/createV2", files, {})
      .then(response => console.log(response))
      .then(result => console.log(result))
      .catch(error => console.error('error', error));
    titleRef.current.value = '';
    contextRef.current.value = '';
    setImages('');
  };

  return (
    <form onSubmit={onSubmit}>
      <ImageUploading
        multiple
        value={images}
        onChange={onlistChange}
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
          <div
          {...dragProps}>
            <div
              className="uploadimg"
              onClick={onImageUpload}
            >
              <img src={upload} alt="왜"/>

            </div>
            <div onClick={onImageRemoveAll}>RESET</div>
            &nbsp;
            <Grid container spacing={1}>
            {imageList.map((img, index) => (
              <Grid key={index} className="image-item">
               <img src={img.data_url} alt="어디써" width="100" />
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
          <input ref={contextRef} type="text" placeholder="내용을 입력하세요"/>

      </div>
      <button>생성하기</button>
    </form>
  );
}
