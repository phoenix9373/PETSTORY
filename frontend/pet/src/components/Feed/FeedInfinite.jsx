import React from 'react';
import { GridLayout } from '@egjs/react-infinitegrid';
import FeedItem from './FeedItem';
// import './FeedInfinite.css';

const IMG_SRC = 'https://naver.github.io/egjs-infinitegrid/assets/image/';

class Test extends React.Component {
  state = { list: [] };

  // 아이템 로드
  loadItems(groupKey, num) {
    const items = [];
    const start = this.start || 0;

    for (let i = 0; i < num; ++i) {
      items.push(
        <FeedItem
          groupKey={groupKey}
          imageSrc={`${IMG_SRC}${i + 1}.jpg`}
          key={start + i}
        />,
      );
    }
    this.start = start + num;
    return items;
  }

  // 아이템 추가.
  onAppend = ({ groupKey, startLoading }) => {
    startLoading();
    // 100개까지 허용.
    if (this.state.list.length < 100) {
      const list = this.state.list;
      const items = this.loadItems((parseFloat(groupKey) || 0) + 1, 5);

      this.setState({ list: list.concat(items) });
    }
  };

  // 아이템 로드 종료.
  onLayoutComplete = ({ isLayout, endLoading }) => {
    !isLayout && endLoading();
  };
  render() {
    return (
      <GridLayout
        options={{
          isConstantSize: true,
          transitionDuration: 0.2,
        }}
        layoutOptions={{
          margin: 10,
          align: 'center',
        }}
        onAppend={this.onAppend}
        onLayoutComplete={this.onLayoutComplete}
      >
        {this.state.list}
      </GridLayout>
    );
  }
}

export default Test;
