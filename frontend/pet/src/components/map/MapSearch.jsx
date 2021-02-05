import React, { useRef, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import './MapSearch.scss';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

function MapSearch(props) {
  const searchRef = useRef(null);
  const onChangeHandler = (e) => {
    console.log(e.target.value);
  };
  const onSubmitHandler = (e) => {
    e.preventDefault();
    props.onSearchData(searchRef.current.value);
  };

  return (
    <>
      <form className="MapSearch__form" onSubmit={onSubmitHandler}>
        <input
          className="MapSearch__input"
          type="text"
          ref={searchRef}
          placeholder="동물병원의 지역을 검색하세요"
          onChange={onChangeHandler}
          required
        />
        <button className="MapSearch__btn" type="submit">
          <FontAwesomeIcon icon={faSearch} size="3x" />
        </button>
      </form>
    </>
  );
}
export default withRouter(MapSearch);
