import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import MapContent from '../../components/Map/MapContent';
import MapSearch from '../../components/Map/MapSearch';
import './Map.scss';

function Map() {
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

export default withRouter(Map);
