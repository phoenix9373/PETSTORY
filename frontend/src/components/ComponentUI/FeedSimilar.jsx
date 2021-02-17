import React, { useEffect, useState } from 'react';

// Library
import { GridLayout } from '@egjs/react-infinitegrid';

// Components
import FeedItem from '../Feed/FeedItem';
import { request } from '../../utils/axios';

// CSS
import './FeedSimilar.css';

function FeedSimilar(props) {
  const items = props.feedItems;

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
<<<<<<< HEAD
=======
        // 이벤트 종류.
        // 아이템들을 아웃라인 아래에 추가.
        // onAppend={(e) => {
        //   if (e.currentTarget.isProcessing()) {
        //     return;
        //   }
        //   onAppend(e);
        // }}
        // onLayoutComplete={(e) => onLayoutComplete(e)}
>>>>>>> upstream/develop
      >
        {items}
      </GridLayout>
    </>
  );
}

export default FeedSimilar;
