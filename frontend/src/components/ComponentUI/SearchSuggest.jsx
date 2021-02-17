import React from 'react';

// CSS
import styles from './SearchSuggest.module.css';
import photo1 from '../../assets/animals/1.jpg';
import photo2 from '../../assets/animals/2.jpg';
import photo3 from '../../assets/animals/3.jpg';
import photo4 from '../../assets/animals/4.jpg';
import photo5 from '../../assets/animals/5.jpg';
import photo6 from '../../assets/animals/6.jpg';
import photo7 from '../../assets/animals/7.jpg';
import photo8 from '../../assets/animals/8.jpg';
import photo9 from '../../assets/animals/9.jpg';
import photo10 from '../../assets/animals/10.jpg';
import photo11 from '../../assets/animals/11.jpg';
import photo12 from '../../assets/animals/12.jpg';

const bg = [];
bg[bg.length] = photo1;
bg[bg.length] = photo2;
bg[bg.length] = photo3;
bg[bg.length] = photo4;
bg[bg.length] = photo5;
bg[bg.length] = photo6;
bg[bg.length] = photo7;
bg[bg.length] = photo8;
bg[bg.length] = photo9;
bg[bg.length] = photo10;
bg[bg.length] = photo11;
bg[bg.length] = photo12;

function SearchSuggest({ results, popular, tagClicked }) {
  const onClickHandler = (val, idx) => {
    tagClicked(val, idx);
  };
  // const size = Math.floor(Math.random() * bg.length);

  return (
    <>
      <div className={styles.wrapper}>
        <h3 className={styles.h3}>연관 검색어</h3>
        {results && (
          <ul className={styles.ul}>
            {results.map((items, index) => (
              <li
                className={styles.li}
                key={index * 999}
                onClick={() => onClickHandler('first', index)}
              >
                #{items}
              </li>
            ))}
          </ul>
        )}
        <hr />
        <h3 className={styles.h3}>PetStory에서 가장 인기</h3>
        <ul className={styles.ulPopular}>
          {popular &&
            popular.map((item, idx) => (
              <li
                key={idx}
                className={styles.liPopular}
                style={{ backgroundImage: `url(${bg[idx]})` }}
                onClick={() => onClickHandler('second', idx)}
              >
                <div className={styles.span}>{item.hashtagName}</div>
              </li>
            ))}
        </ul>
      </div>
    </>
  );
}

export default SearchSuggest;
