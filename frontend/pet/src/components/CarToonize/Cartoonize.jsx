import React, { useEffect } from 'react';
import './CarToonize.css';
import {
  CartoonWorkerManager,
  generateCartoonDefaultConfig,
  generateDefaultCartoonParams,
} from '@dannadori/white-box-cartoonization-worker-js';
import { withRouter } from 'react-router-dom';

function CarToonize({ img }) {
  useEffect(() => {
    const manager = new CartoonWorkerManager();
    const config = generateCartoonDefaultConfig();
    const params = generateDefaultCartoonParams();
    console.log(params);
    const srcCanvas = document.createElement('canvas');
    const dstCanvas = document.createElement('canvas');
    document.getElementById('origin__img').appendChild(srcCanvas);
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
          });
      };
    }
  }, [img]);

  return (
    <>
      <div id="origin__img"></div>
      <div id="result__img"></div>
    </>
  );
}

export default withRouter(CarToonize);
