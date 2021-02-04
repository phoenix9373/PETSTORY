import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getFeedDataAction } from '../../_actions/getFeedDataAction';

// library
import { GridLayout } from '@egjs/react-infinitegrid';

// components
import FeedItem from './FeedItem';

function FeedInfinite(props) {
  const [items, setItems] = useState([]);
  const [temp, setTemp] = useState(100);
  const [startIdx, setStartIdx] = useState(0);
  const dispatch = useDispatch();

  // axios 요청
  async function getFeedData(start, end) {
    const response = await dispatch(getFeedDataAction(start, end));
    return response.payload && response.payload.data;
  }

  // axios 요청 - 데이터 수신 - map으로 변환 - 반환
  async function loadItems(groupKey, num) {
    setTemp((temp) => temp + 100);
    // 그룹키, 개수, start 인덱스
    const getItems = await getFeedData(startIdx, startIdx + num);
    if (typeof getItems === 'undefined') {
      return [];
    }
    const newItems = [...getItems].map(
      (item, index) =>
        item.files && (
          <FeedItem
            groupKey={groupKey}
            imageSrc={item.files[0].imgFullPath}
            key={temp + index}
          />
        ),
    );

    setStartIdx((start) => start + num);
    return newItems;
  }

  // 아이템 추가했을 때 발생하는 이벤트
  async function onAppend({ groupKey, startLoading, endLoading }) {
    startLoading();
    const addedItems = await loadItems(groupKey + 1, 10);
    if (addedItems) {
      console.log(addedItems);
      setItems((items) => items.concat(addedItems));
    } else {
      endLoading();
    }
  }

  // 아이템 로드 종료.
  function onLayoutComplete({ isLayout, endLoading }) {
    !isLayout && endLoading();
  }

  return (
    <div>
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
    </div>
  );
}

export default FeedInfinite;
