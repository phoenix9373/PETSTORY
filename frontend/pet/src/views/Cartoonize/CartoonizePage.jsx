import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import CarToonize from '../../components/CarToonize/Cartoonize';

function CartoonizePage() {
  const [imgFile, setImgFile] = useState(null);

  // 이미지 파일 업로드시 임시 URL을 얻기 위해 createObjectURL을 사용함
  const handleChangeFile = (event) => {
    setImgFile(URL.createObjectURL(event.target.files[0]));
  };

  return (
    <>
      <input type="file" onChange={handleChangeFile} />
      {imgFile && <CarToonize img={imgFile} />}
    </>
  );
}

export default withRouter(CartoonizePage);
