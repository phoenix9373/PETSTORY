import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getFeedDataAction } from '../../_actions/getFeedDataAction';

// components
import FeedColumn from './FeedColumn';

// utils
import splitArray from '../../assets/js/SplitArray';
import styles from './FeedFrame.module.css';

// 임시
import makeDummyData from './makeDummyData';

function FeedFrame(props) {
  // State
  const [allItems, setAllItems] = useState(splitArray(makeDummyData(20)));
  const dispatch = useDispatch();

  // 비동기 요청
  const axiosBoard = () => {
    dispatch(getFeedDataAction())
      .then((res) => {
        console.log('------------------------');
        console.log(res);
        console.log(res.data);
        console.log('------------------------');
        setAllItems(splitArray(res.data));
      })
      .catch((error) => {
        console.log(`error 났어, ${error}`);
      });
  };

  // 임시 함수
  function callBackBoardAPI() {
    axiosBoard();
  }

  return (
    <div className={styles.frame}>
      {/* {allItems.map((item) => (
        <FeedColumn item={item.items} key={item.list_id} />
      ))} */}
      <button type="button" onClick={callBackBoardAPI}>
        임시 추가
      </button>
    </div>
  );
}

export default FeedFrame;
