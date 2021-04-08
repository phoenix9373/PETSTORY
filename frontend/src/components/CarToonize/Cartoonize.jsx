import React, { useEffect, useState } from 'react';
import styles from './Cartoonize.module.css';
import {
  CartoonWorkerManager,
  generateCartoonDefaultConfig,
  generateDefaultCartoonParams,
} from '@dannadori/white-box-cartoonization-worker-js';
import { withRouter } from 'react-router-dom';

function CarToonize({ img }) {
  const [cartoonizedImage, setCartoonizedImage] = useState(null);

  // cartoonize 모듈 불러옴옴
  const manager = new CartoonWorkerManager();
  const config = generateCartoonDefaultConfig();
  const params = generateDefaultCartoonParams();

  useEffect(() => {
    // 태그생성
    const srcCanvas = document.createElement('canvas');
    const dstCanvas = document.createElement('canvas');

    // result__img에 자식요소 추가가
    document.getElementById('result__img').appendChild(dstCanvas);
    const srcImage = document.createElement('img');
    srcImage.src = img;

    if (srcImage.src) {
      srcImage.onload = () => {
        manager
          .init(config)
          .then(() => {
            srcCanvas
              .getContext('2d')
              .drawImage(srcImage, 0, 0, srcCanvas.width, dstCanvas.height);
            return manager.predict(srcCanvas, params);
          })
          .then((res) => {
            dstCanvas
              .getContext('2d')
              .drawImage(res, 0, 0, dstCanvas.width, dstCanvas.height);
            setCartoonizedImage(dstCanvas.toDataURL());
          });
      };
    }
  }, [img]);

  return (
    <>
      <div className={styles.container} id="result__img"></div>
    </>
  );
}

export default withRouter(CarToonize);
