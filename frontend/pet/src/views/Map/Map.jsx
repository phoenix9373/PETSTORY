import React, { useState } from 'react';
import MapContent from '../../components/map/MapContent';
import MapSearch from '../../components/map/MapSearch';
import './Map.scss';

function KakaoMap() {
  const [searchData, setSearchData] = useState('대전');

  const onHandleSearch = (value) => {
    setSearchData(value);
  };

  return (
    <div className="kakaomap">
      <MapSearch onSearchData={onHandleSearch} />
      <MapContent searchData={searchData} />
    </div>
  );
}

export default KakaoMap;
