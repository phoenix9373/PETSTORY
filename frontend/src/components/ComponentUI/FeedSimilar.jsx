import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getFeedDataActionWithHashtags } from '../../_actions/getFeedDataActionWithHashtags';

// Library
import { GridLayout } from '@egjs/react-infinitegrid';

// Components
import FeedItem from '../Feed/FeedItem';
import { request } from '../../utils/axios';

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

    return newItems;
  }

  // 아이템 추가했을 때 발생하는 이벤트
  async function onAppend({ groupKey, startLoading }) {
    startLoading();
    const addedItems = await loadItems(groupKey + 1);
    setItems(() => addedItems);
  }

  // 아이템 로드 종료.
  function onLayoutComplete({ isLayout, endLoading }) {
    !isLayout && endLoading();
  }

  function resolveAfter2Seconds(item) {
    return request('GET', `/api/board/findOne/${item.boardId}`);
  }

  async function getItems() {
    const boardList = props.feedItems;
    const itemList = await Promise.all(
      boardList.map((item) => {
        const res = resolveAfter2Seconds(item);
        return res.data;
      }),
    );
    console.log(itemList);
    setBoardItems((prev) => itemList.concat(prev));
  }

  useEffect(() => {
    getItems();
  }, []);

  return (
    <>
      <GridLayout
        tag="div"
        // loading={<Progress></Progress>}
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
        onAppend={(e) => {
          if (e.currentTarget.isProcessing()) {
            return;
          }
          onAppend(e);
        }}
        //
        onLayoutComplete={(e) => onLayoutComplete(e)}
      >
        {items}
      </GridLayout>
    </>
  );
}

export default FeedSimilar;
