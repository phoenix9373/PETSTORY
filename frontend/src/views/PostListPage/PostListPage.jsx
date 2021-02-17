import React from 'react';
import { withRouter, useLocation } from 'react-router-dom';
import PostListResult from '../../components/Feed/PostListResult';

// CSS
import styles from './PostListPage.module.css';

function PostListPage({ match, history }) {
  const location = useLocation();
  const data = match.params;

  console.log(match.params);
  console.log(location);
  const postlistName =
    (location.state && location.state.postlistName) || data.postlistName;
  const memberPostlistId =
    (location.state && location.state.memberPostlistId) ||
    data.memberPostlistId;
  const memberId = (location.state && location.state.memberId) || data.memberId;
  return (
    <div className={styles.frame}>
      <h1
        className={styles.title}
      >{`"${postlistName}" 목록에 저장하신 피드입니다.`}</h1>
      <PostListResult memberPostlistId={memberPostlistId}></PostListResult>
    </div>
  );
}

export default withRouter(PostListPage);
