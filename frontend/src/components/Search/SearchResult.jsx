import React from 'react';
import styles from './SearchResult.module.css';
import FeedProfile from '../Feed/FeedProfile';
import { useHistory } from 'react-router-dom';

function SearchResult({ items }) {
  const history = useHistory();
  const handleDetail = (feedItem) => {
    history.push(`/detail/${feedItem.boardId}`, feedItem);
  };

  return (
    <>
      <ul className={styles.ul}>
        {items &&
          items.map(
            (item) =>
              item.files && (
                <li className={styles.li} key={item.boardId}>
                  {/* 이미지 요소 */}
                  <img
                    onClick={() => handleDetail(item)}
                    className={styles.img}
                    src={item.files[0] && item.files[0].imgFullPath}
                    alt="cat"
                  />
                  <FeedProfile feedItem={item} />
                </li>
              ),
          )}
      </ul>
    </>
  );
}

export default SearchResult;
