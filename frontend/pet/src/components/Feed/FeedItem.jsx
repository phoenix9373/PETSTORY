import React, { Fragment, useEffect, useState } from 'react';
import FeedButton from './FeedButton';
import FeedProfile from './FeedProfile';

// axios
import axios from 'axios';

// css 파일
import './FeedItem.css';

// fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShareAlt, faEllipsisH } from '@fortawesome/free-solid-svg-icons';

function FeedItem(props) {
  return (
    <div className="feed-item">
      <img className="feed-item-img" src={props.imageSrc} alt="cat" />
      <FeedButton />
      <FontAwesomeIcon className="feed-icon icon-left" icon={faShareAlt} />
      <FontAwesomeIcon className="feed-icon icon-right" icon={faEllipsisH} />
    </div>
  );
}

export default FeedItem;
