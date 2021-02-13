import React, { useState } from 'react';
import styles from './DropArea.module.css';

function DropArea({ transForm }) {
  const [data, setData] = useState(false);
  const [rowdata, setRowData] = useState(false);
  const [err, setErr] = useState(false);

  const filesTrans = (files) => {
    setRowData(files);
    const reader = new FileReader();
    const fileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    const { size, type } = files;

    setData(false);
    if (!fileTypes.includes(type)) {
      setErr('파일형식은 jpg나 png이어야 합니다.');
    }
    if (size / 1024 / 1024 > 2) {
      setErr('파일크기는 2MB이하여야 합니다');
    }
    setErr(false);

    reader.readAsDataURL(files[0]);
    reader.onload = (loadEvt) => {
      setData(loadEvt.target.result);
    };
  };

  const onImageChange = (e) => {
    const files = e.target.files;
    filesTrans(files);
  };

  const onDrop = (e) => {
    console.log(e);
    e.preventDefault();
    const {
      dataTransfer: { files },
    } = e;
    filesTrans(files);
  };

  const onDragOver = (e) => {
    e.preventDefault();
  };

  const removeImg = () => {
    setData(false);
    const temp = document.getElementById('result__img');
    if (temp.firstChild) {
      let first = temp.firstChild;
      while (first) {
        temp.removeChild(temp.firstChild);
        first = temp.firstChild;
      }
    }
  };

  const ImageTrans = () => {
    const temp = document.getElementById('result__img');
    if (temp === null) {
      transForm(rowdata);
    } else {
      let first = temp.firstChild;
      while (first) {
        temp.removeChild(temp.firstChild);
        first = temp.firstChild;
      }
      transForm(rowdata);
    }
  };

  return (
    <div className={styles.wrapper}>
      {err && <p>{err}</p>}
      <label htmlFor="CartoonImage">
        <div
          className={styles.dropAreaStyle}
          onDrop={onDrop}
          onDragOver={onDragOver}
        >
          {!data && (
            <div className={styles.placegHolderImage}>
              여기에 이미지를 드래그 하거나 클릭해 주세요
            </div>
          )}
          {data && <img className={styles.dropAreaImageStyle} src={data} />}
        </div>
      </label>
      <input
        type="file"
        id="CartoonImage"
        style={{ display: 'none' }}
        onChange={onImageChange}
      />
      <div className={styles.button__wrapper}>
        {data && (
          <button className={styles.button} onClick={removeImg}>
            Remove
          </button>
        )}
        {data && (
          <button className={styles.button} onClick={ImageTrans}>
            Transform
          </button>
        )}
      </div>
    </div>
  );
}
export default DropArea;
