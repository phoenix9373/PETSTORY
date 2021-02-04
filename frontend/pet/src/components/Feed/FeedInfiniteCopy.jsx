import React, { Component } from 'react';
import { getFeedDataAction } from '../../_actions/getFeedDataAction';
import { request } from '../../utils/axios';

// library
import { GridLayout } from '@egjs/react-infinitegrid';

// components
import FeedItem from './FeedItem';

class FeedInfiniteCopy extends Component {
  constructor(props) {
    super(props);
    this.state = { items: [] };

    this.getFeedData = this.getFeedData.bind(this);
    this.loadItems = this.loadItems.bind(this);
    this.onAppend = this.onAppend.bind(this);
    this.onLayoutComplete = this.onLayoutComplete.bind(this);
  }

  async componentDidMount() {
    const intialItems = await this.loadItems(0, 10, this.state.startIdx);
    console.log(typeof this.state.items);
    this.setState({ items: intialItems });
    console.log('컴포넌트 Did Mount');
  }

  // axios 요청
  async getFeedData(offset, limit) {
    const response = await request(
      'GET',
      '/api/board/findAllPaging',
      {},
      { offset, limit },
    );
    return response.data;
  }

  // axios 요청 - 데이터 수신 - map으로 변환 - 반환
  async loadItems(groupKey, num) {
    // 그룹키, 개수, start 인덱스
    const start = this.start || 0;
    const getItems = await this.getFeedData(start, start + num);
    const newItems = [...getItems].map((item, index) => (
      <FeedItem
        groupKey={groupKey}
        imageSrc={item.files && item.files[0].imgFullPath}
        key={start + index}
      />
    ));
    this.start = start + num;
    return newItems;
  }

  // 아이템 추가했을 때 발생하는 이벤트
  async onAppend({ groupKey, startLoading }) {
    startLoading();
    const addedItems = await this.loadItems(groupKey + 1, 10);
    const items = this.state.items;
    console.log(typeof this.state.items);
    console.log(typeof addedItems);
    this.setState({ items: items.concat(addedItems) });
  }

  // 아이템 로드 종료.
  onLayoutComplete({ isLayout, endLoading }) {
    !isLayout && endLoading();
  }

  render() {
    return (
      <div>
        <GridLayout
          tag="div"
          loading={<div className="loading">Loading...</div>}
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
            this.onAppend(e);
          }}
          //
          onLayoutComplete={(e) => this.onLayoutComplete(e)}
        >
          {this.state.items}
        </GridLayout>
      </div>
    );
  }
}

export default FeedInfiniteCopy;
