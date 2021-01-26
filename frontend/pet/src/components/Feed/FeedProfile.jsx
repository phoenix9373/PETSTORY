import React from 'react';

import './FeedProfile.css';

// fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { faHeartRegular } from '@fortawesome/free-regular-svg-icons';

function FeedProfile(props) {
  // 임시 데이터
  const userImgSrc = 'https://cdn2.thecatapi.com/images/c4i.jpg';
  const userID = 'phoenix9373';
  const countLike = 7;
  const countFollowers = 10;

  return (
    <div className="feed-profile">
      <img className="feed-profile-img" src={userImgSrc} alt="" />
      <span>{userID}</span>
      <FontAwesomeIcon icon={faHeart} />
      <span>{countLike}</span>
      <FontAwesomeIcon icon={faUserPlus} />
      <span>{countFollowers}</span>
    </div>
  );
}

export default FeedProfile;
