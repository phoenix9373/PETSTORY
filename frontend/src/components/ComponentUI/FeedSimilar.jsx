import React, { useEffect, useState } from 'react';

// Library
import { GridLayout } from '@egjs/react-infinitegrid';

// Components
import FeedItem from '../Feed/FeedItem';
import { request } from '../../utils/axios';

// CSS
import './FeedSimilar.css';

function FeedSimilar(props) {
  const [items, setItems] = useState([]);
  const [boardItems, setBoardItems] = useState([]);

  function loadItems(groupKey) {
    // 그룹키, 개수, start 인덱스
    const newItems = [...boardItems].map(
      (item) =>
        item.files && (
          <FeedItem groupKey={groupKey} key={item.boardId} feedItem={item} />
        ),
    );

    setItems(() => newItems);
    return newItems;
  }

  // // 아이템 추가했을 때 발생하는 이벤트
  // async function onAppend({ groupKey, startLoading }) {
  //   startLoading();
  //   const addedItems = await loadItems(groupKey + 1);
  //   setItems(() => addedItems);
  // }

  // // 아이템 로드 종료.
  // function onLayoutComplete({ isLayout, endLoading }) {
  //   !isLayout && endLoading();
  // }

  async function getIntroMessage(id) {
    return new Promise((resolve, reject) => {
      const res = request('GET', `/api/board/findOne/${id}`);
      resolve(res);
    });
  }

  async function getItems() {
    const boardList = props.feedItems;
    const itemList = await Promise.all(
      boardList.map((item) => {
        // const res = requestData('GET', `/api/board/findOne/${item.boardId}`);
        console.log(item);
        return getIntroMessage(item.boardId);
      }),
    );
    const newItemList = itemList.map((item) => item.data);
    // console.log(`newItemList: ${newItemList}`);
    setBoardItems((prev) => newItemList.concat(prev));
  }

  useEffect(() => {
    getItems();
  }, []);

  useEffect(() => {
    loadItems();
  }, [boardItems]);

  return (
    <>
      {items.length === 0 && (
        <h3 className="notice">유사한 피드 목록이 없습니다</h3>
      )}
      <GridLayout
        tag="div"
        options={{
          isConstantSize: true,
          transitionDuration: 0.2,
          threshold: 100,
          isOverflowScroll: false,
          isEqualSize: false,
          useFit: false,
          useRecycle: false,
          horizontal: false,
        }}
        layoutOptions={{
          // 아이템 사이 공간
          margin: 10,
          // 위치의 정렬
          align: 'center',
          // 스크롤 이동 방향: false == 세로
          horizontal: false,
          // 0이면 첫번째 아이템의 사이즈로 계산.
          itemSize: 0,
        }}
        // 이벤트 종류.
        // 아이템들을 아웃라인 아래에 추가.
        // onAppend={(e) => {
        //   if (e.currentTarget.isProcessing()) {
        //     return;
        //   }
        //   onAppend(e);
        // }}
        // onLayoutComplete={(e) => onLayoutComplete(e)}
      >
        {items}
      </GridLayout>
    </>
  );
}

export default FeedSimilar;
