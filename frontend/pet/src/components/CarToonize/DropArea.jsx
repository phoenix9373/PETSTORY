import React, { useState } from 'react';
import styles from './DropArea.module.css';

function DropArea({ transForm }) {
  const [data, setData] = useState(false);
  const [rowdata, setRowData] = useState(false);
  const [err, setErr] = useState(false);

  const onDrop = (e) => {
    e.preventDefault();
    const {
      dataTransfer: { files },
    } = e;
    setRowData(files);

    const reader = new FileReader();
    const fileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    const { size, type } = files[0];

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

  const onDragOver = (e) => {
    e.preventDefault();
  };

  const ImageTrans = () => {
    transForm(rowdata);
  };
  return (
    <div className={styles.wrapper}>
      {err && <p>{err}</p>}
      <div
        className={styles.dropAreaStyle}
        onDrop={(e) => onDrop(e)}
        onDragOver={(e) => onDragOver(e)}
      >
        {data && <img className={styles.dropAreaImageStyle} src={data} />}
      </div>
      <div className={styles.button__wrapper}>
        {data && (
          <button
            className={styles.button}
            onClick={() => {
              setData(false);
              const temp = document.getElementById('result__img');
              if (temp.lastElementChild) {
                const child = temp.lastElementChild;
                temp.removeChild(child);
              }
            }}
          >
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
