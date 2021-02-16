import React, { useEffect, useRef } from 'react';

// CSS
import styles from './SearchBar.module.css';

// Material UI Icon
import { BiSearch } from 'react-icons/bi';

function SearchBar(props) {
  const searchRef = useRef(null);
  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Search!!!!!');
    searchRef.current.value = '';
  };

  useEffect(() => {
    console.log(searchRef.current);
  }, []);
  return (
    <div className={styles.commentForm}>
      <form className={styles.form} onSubmit={handleSearch}>
        <input
          type="text"
          className={styles.input}
          placeholder="해시태그를 검색하세요."
          ref={searchRef}
        />
      </form>
      <BiSearch className={styles.icon}></BiSearch>
    </div>
  );
}

export default SearchBar;
