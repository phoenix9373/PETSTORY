import React from 'react';
import FeedItem from './FeedItem';
import styles from './FeedColumn.module.css';

function FeedColumn(props) {
  return (
    <div className={styles.column}>
      {props.item.map((item) => (
        <FeedItem imageSrc={item.url} />
      ))}
    </div>
  );
}

export default FeedColumn;
