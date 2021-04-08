import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

// Component
import SearchSuggest from './SearchSuggest';

// CSS
import styles from './SearchBar.module.css';

// Material UI Icon
import { BiSearch } from 'react-icons/bi';

function SearchBar({ handleIsFocus, isFocus }) {
  const searchRef = useRef(null);
  const [results, setResults] = useState(null);
  const [popular, setPopular] = useState(null);
  const history = useHistory();

  // Input 제출 이벤트 발생
  const onsubmitHandler = (e) => {
    e.preventDefault();
    handleIsFocus(false);
    const keyword = searchRef.current.value;
    history.push({
      pathname: '/search',
      search: `?query=${keyword}`,
    });
  };

  // 태그 클릭 이벤트 발생
  const tagClicked = (keyword) => {
    console.log(keyword);
    searchRef.current.value = keyword;
    history.push({
      pathname: '/search',
      search: `?query=${keyword}`,
    });
  };

  // 인기태그 검색
  const initPopular = () => {
    axios
      .get(`/api/hashtag/findPopulars`)
      .then((res) => {
        setPopular(res.data.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // Input 값 변화 될 때마다 호출
  const onchangeHandler = (e) => {
    e.preventDefault();
    initPopular();
    if (!isFocus) {
      handleIsFocus(true);
    }
    const temp = searchRef.current.value;
    if (temp) {
      axios
        .get(`/api/hashtag/findOne/${temp}`)
        .then((res) => {
          setResults(res.data.data);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  // 포커스 이벤트
  const onfocusHandler = (e) => {
    handleIsFocus(true);
  };

  // 포커스 아웃 이벤트
  const onblurHandler = (e) => {
    setTimeout(() => {
      handleIsFocus(false);
    }, 100);
  };

  // initPopular hook
  useEffect(() => {
    initPopular();
  }, []);

  window.addEventListener('scroll', (e) => {
    handleIsFocus(false);
  });
  return (
    <>
      <div className={styles.commentForm}>
        <form className={styles.form} onSubmit={onsubmitHandler}>
          <input
            type="text"
            className={isFocus ? styles.inputactive : styles.input}
            placeholder="해시태그를 검색하세요."
            ref={searchRef}
            onChange={onchangeHandler}
            onFocus={onfocusHandler}
            onBlur={onblurHandler}
            autoComplete="off"
            required
          />
        </form>
        <BiSearch className={styles.icon}></BiSearch>
        {isFocus && (
          <SearchSuggest
            results={results}
            popular={popular}
            tagClicked={tagClicked}
          />
        )}
      </div>
      {isFocus && <div className={styles.back}></div>}
    </>
  );
}

export default SearchBar;
