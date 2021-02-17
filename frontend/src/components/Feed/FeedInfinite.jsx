import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getFeedDataAction } from '../../_actions/getFeedDataAction';

// Library
import { GridLayout } from '@egjs/react-infinitegrid';

// Components
import FeedItem from './FeedItem';
import Progress from '../ComponentUI/Progress';

function FeedInfinite(props) {
  const [items, setItems] = useState([]);
  const [startIdx, setStartIdx] = useState(0);
  const dispatch = useDispatch();

  // axios 요청
  async function getFeedData(offset, limit) {
    // offset : start index
    // limit : 한 번에 가져올 데이터 개수.
    const response = await dispatch(
      getFeedDataAction(
        offset,
        limit,
        Number(localStorage.getItem('profileId')),
      ),
    );
    return response.payload && response.payload.data;
  }

  // axios 요청 - 데이터 수신 - map으로 변환 - 반환
  async function loadItems(groupKey, num) {
    // 그룹키, 개수, start 인덱스
    const getItems = await getFeedData(startIdx, num);
    const newItems = [...getItems].map(
      (item) =>
        item.files && (
          <FeedItem groupKey={groupKey} key={item.boardId} feedItem={item} />
        ),
    );

    setStartIdx((prev) => prev + num);
    return newItems;
  }

  // 아이템 추가했을 때 발생하는 이벤트
  async function onAppend({ groupKey, startLoading }) {
    startLoading();
    const addedItems = await loadItems(groupKey + 1, 10);
    setItems((items) => items.concat(addedItems));
  }

  // 아이템 로드 종료.
  function onLayoutComplete({ isLayout, endLoading }) {
    !isLayout && endLoading();
  }

  return (
    <>
      <GridLayout
        tag="div"
        loading={<div></div>}
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

export default FeedInfinite;
