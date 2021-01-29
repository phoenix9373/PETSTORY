import React, { useEffect, useState } from 'react';
import FeedColumn from './FeedColumn';
import './FeedFrame.css';
import splitArray from '../../assets/js/SplitArray';

function FeedFrame(props) {
  // State
  const [feedItems, setFeedItems] = useState([]);

  // 정적 데이터
  const API_KEY = '6ee87211-02b7-4b74-9ec1-4146ed17236b';
  const LIMIT = 25;
  const SIZE = 'med';

  // Effect
  useEffect(() => {
    const requestOptions = {
      method: 'GET',
      redirect: 'follow',
    };

    fetch(
      `https://api.thecatapi.com/v1/images/search?limit=${LIMIT}&size=${SIZE}&api_key=${API_KEY}`,
      requestOptions,
    )
      .then((response) => response.json())
      .then((data) => {
        const dataList = data.map((item) => {
          const obj = { id: item.id, url: item.url };
          return obj;
        });

        setFeedItems(dataList);
      })
      .catch((error) => console.log('fetch error', error));
  }, []);

  const feedColumnArray = splitArray(feedItems, 4);

  return (
    <div className="feed-frame">
      {feedColumnArray.map((item) => (
        <FeedColumn item={item.items} key={item.list_id} />
      ))}
    </div>
  );
}

export default FeedFrame;
