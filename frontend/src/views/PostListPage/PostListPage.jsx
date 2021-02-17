import React from 'react';
import { withRouter, useLocation } from 'react-router-dom';
import PostListResult from '../../components/Feed/PostListResult';

// CSS
import styles from './PostListPage.module.css';

function PostListPage() {
  const location = useLocation();

  const postlistName = location.state.postlistName;
  const memberPostlistId = location.state.memberPostlistId;
  const memberId = location.state.memberId;
  return (
    <div className={styles.frame}>
      <h1>{postlistName}</h1>
      <PostListResult memberPostlistId={memberPostlistId}></PostListResult>
    </div>
  );
}

export default withRouter(PostListPage);
