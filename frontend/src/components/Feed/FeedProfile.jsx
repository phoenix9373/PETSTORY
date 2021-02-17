import React, { useState } from 'react';

import styles from './FeedProfile.module.css';

// React Icons
import { RiHeart3Line, RiHeart3Fill, RiEyeFill } from 'react-icons/ri';
import { MdRemoveRedEye } from 'react-icons/md';

function FeedProfile(props) {
  // 데이터
  const item = props.feedItem;
  const userImgSrc = item.imgFullPath;
  const userNickName = item.nickname;

  // 로그인한 유저
  const loginUser = Number(localStorage.getItem('profileId'));

  // 피드 ID
  const boardId = item.boardId;

  // 현재 로그인한 유저 프로필 id가 현재 Feed의 좋아요 리스트 안에 있으면 초기값 true로.
  // State
  const [likeToggle, setLikeToggle] = useState(false);
  const [countLike, setCountLike] = useState(item.likeNum);
  const [countReport, setCountReport] = useState(item.reportNum);

  // Method
  const handleLikeToggle = () => {
    if (likeToggle && countLike > 0) {
      setCountLike((prev) => prev - 1);
    } else {
      setCountLike((prev) => prev + 1);
    }

    setLikeToggle((prev) => !prev);
  };

  return (
    <div className={styles.profile}>
      <div className={styles.left}>
        <img className={styles.image} src={userImgSrc} alt="" />
        <span className={styles.nickname}>{userNickName}</span>
      </div>
      <div className={styles.right}>
        <div className={styles.like}>
          {likeToggle ? (
            <RiHeart3Fill
              onClick={handleLikeToggle}
              color="red"
              className={`${styles.icon} heart`}
            />
          ) : (
            <RiHeart3Line
              onClick={handleLikeToggle}
              className={`${styles.icon} heart`}
            />
          )}
          {countLike}
        </div>

        <div className={styles.report}>
          <MdRemoveRedEye className={styles.icon} />
          {countReport}
        </div>
      </div>
    </div>
  );
}

export default FeedProfile;
