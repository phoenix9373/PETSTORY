import React from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import styles from './UserFeedsTabs.module.css';

function UserFeedsTabsItem({ article }) {
  const feedItem = article;
  const history = useHistory();

  const handleFeed = () => {
    history.push(`/detail/${article.boardId}`, feedItem);
  };

  return (
    <img
      className={styles.img}
      onClick={handleFeed}
      src={article.files[0].imgFullPath}
      alt="게시물 이미지"
    />
  );
}

export default withRouter(UserFeedsTabsItem);
