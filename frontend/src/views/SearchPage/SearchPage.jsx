import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { withRouter, useLocation } from 'react-router-dom';
import SearchResult from '../../components/Search/SearchResult';

// CSS
import styles from './SearchPage.module.css';

function SearchPage(props) {
  const location = useLocation();
  const keyword = unescape(decodeURIComponent(location.search.split('=')[1]));
  const [feedItems, setFeedItems] = useState([]);
  const [isdata, setIsData] = useState(true);

  const getBoardByHashtagname = (e) => {
    const profileID = localStorage.getItem('profileId');
    axios({
      method: 'GET',
      url: `/api/board/findHashtag/${profileID}`,
      params: { hashtag_name: keyword },
    })
      .then((res) => {
        console.log(res.data.data);
        if (res.data.data.length !== 0) {
          setFeedItems(res.data.data);
          setIsData(true);
        } else {
          setIsData(false);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    getBoardByHashtagname();
  }, [keyword]);

  return (
    <div className={styles.frame}>
      {isdata ? (
        <>
          <h1
            className={styles.title}
          >{`검색하신 "${keyword}"의 결과 입니다.`}</h1>
          <SearchResult items={feedItems} />
        </>
      ) : (
        <h1 className={styles.title}>검색 결과가 없습니다...</h1>
      )}
    </div>
  );
}

export default withRouter(SearchPage);
