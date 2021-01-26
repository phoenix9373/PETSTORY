import React from 'react';
import FeedColumn from './FeedColumn';
import './FeedFrame.css';

function FeedFrame(props) {
  return (
    <div className="feed-frame">
      <FeedColumn />
      <FeedColumn />
      <FeedColumn />
      <FeedColumn />
    </div>
  );
}

export default FeedFrame;
