import React from 'react';

import styles from 'PostListFeed.module.css';

function PostListFeed(props) {
  const postlistName = props.postlistName;

  const handleDetail = () => {
    history.push(`/postlist/${postlistName}`, postlistName);
  };

  return (
    <div className={styles.frame}>
      <h1>{postlistName}</h1>
    </div>
  );
}

export default PostListFeed;
