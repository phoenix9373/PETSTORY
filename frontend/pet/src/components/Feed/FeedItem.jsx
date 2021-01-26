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
  const [imageURL, setImageURL] = useState('');

  // TheCatAPI 임시 사용. -> props.item으로 대체
  useEffect(() => {
    let config = {
      method: 'get',
      url:
        'https://api.thecatapi.com/v1/images/search?key=3c9071e3-419c-4c60-bc5f-b5b4b2deaaf2',
      headers: {},
    };

    axios(config)
      .then(function (response) {
        setImageURL(response.data[0].url);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []); // useEffect의 두번째 인자에 빈 배열 -> mount or unmount 될때만 호출
  // 그 외에 infinite loop에 빠짐.
  // useState로 선언한 state를 배열로 주면(두번째 인자로)
  // 해당 값이 update 될 때도 다시 호출한다.

  return (
    <div className="feed-item">
      <img className="feed-item-img" src={imageURL} alt="cat" />
      <FeedButton />
      <FontAwesomeIcon className="feed-icon icon-left" icon={faShareAlt} />
      <FontAwesomeIcon className="feed-icon icon-right" icon={faEllipsisH} />
    </div>
  );
}

export default FeedItem;
