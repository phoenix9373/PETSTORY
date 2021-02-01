import React from 'react';
import FeedItem from './FeedItem';
import FeedProfile from './FeedProfile';
import './FeedColumn.css';

function FeedColumn(props) {
  return (
    <div className="feed-column">
      {props.items.map((item) => (
        <FeedItem imageSrc={item.file.imgFullPath} key={item.boardId} />
      ))}
    </div>
  );
}

export default FeedColumn;
