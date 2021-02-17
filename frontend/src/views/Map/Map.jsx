import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import MapContent from '../../components/Map/MapContent';
import MapSearch from '../../components/Map/MapSearch';
import './Map.scss';

function Map() {
  const [searchData, setSearchData] = useState('대전');
  const [resultNum, setResultNum] = useState(7);

  const onHandleSearch = (value) => {
    setSearchData(value);
  };

  const onHandleNum = (value) => {
    setResultNum(value);
  };

  return (
    <div className="kakaomap">
      <div className="map__header">동물병원의 지역을 검색해주세요!</div>
      <MapSearch onSearchInput={onHandleSearch} onSearchNum={onHandleNum} />
      <MapContent searchData={searchData} resultNum={resultNum} />
    </div>
  );
}

export default withRouter(Map);
