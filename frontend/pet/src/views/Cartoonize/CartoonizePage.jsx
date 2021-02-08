import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import CarToonize from '../../components/CarToonize/Cartoonize';
import DropArea from '../../components/CarToonize/DropArea';
import styles from './CartoonizePage.module.css';
import { ImArrowRight } from 'react-icons/im';

function CartoonizePage() {
  const [imgFile, setImgFile] = useState(null);

  // 이미지 파일 업로드시 임시 URL을 얻기 위해 createObjectURL을 사용함
  const handleChangeFile = (event) => {
    setImgFile(URL.createObjectURL(event[0]));
  };

  return (
    <>
      <div className={styles.wrapper}>
        <DropArea transForm={handleChangeFile} />
        {imgFile && <ImArrowRight className={styles.icon} />}
        {imgFile && <CarToonize img={imgFile} />}
      </div>
    </>
  );
}

export default withRouter(CartoonizePage);
