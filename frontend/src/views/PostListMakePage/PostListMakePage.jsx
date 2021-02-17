import React from 'react';
import { withRouter } from 'react-router-dom';

// CSS
import styles from './PostListMakePage.module.css';

// Components
import PostList from '../../components/PostList/PostList';

function PostListMakePage(props) {
  return (
    <div className={styles.frame}>
      <PostList></PostList>
    </div>
  );
}

export default withRouter(PostListMakePage);
