import React from 'react';
import FeedItem from './FeedItem';
import FeedProfile from './FeedProfile';
import './FeedColumn.css';

function FeedColumn(props) {
  return (
    <div className="feed-column">
      {props.item.map((item) => (
        <FeedItem imageSrc={item.url} />
      ))}
    </div>
  );
}

export default FeedColumn;
