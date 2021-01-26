import React from 'react';
import './FeedButton.css';

// fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';

function FeedButton(props) {
  return (
    <div className="feed-btn-frame">
      <button className="feed-btn btn-left" type="button">
        <span className="btn-text">내 피드</span>
        <FontAwesomeIcon icon={faAngleDown} />
      </button>
      <button className="feed-btn btn-right" type="button">
        저장
      </button>
    </div>
  );
}

export default FeedButton;
