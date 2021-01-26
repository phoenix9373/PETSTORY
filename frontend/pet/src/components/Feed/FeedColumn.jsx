import React from 'react';
import FeedItem from './FeedItem';
import FeedProfile from './FeedProfile';
import './FeedColumn.css';

function FeedColumn(props) {
  return (
    <div className="feed-column">
      <FeedItem />
      <FeedProfile />
      <FeedItem />
      <FeedItem />
      <FeedItem />
    </div>
  );
}

export default FeedColumn;
