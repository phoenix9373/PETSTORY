import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import FeedDetail from '../../components/Feed/FeedDetail';
import FeedInfinite from '../../components/Feed/FeedInfinite';
import FeedTest from '../../components/Feed/FeedTest';

function MainPage(props) {
  return (
    <div>
      {/* <FeedDetail /> */}
      <FeedInfinite />
      {/* <FeedTest /> */}
    </div>
  );
}

export default withRouter(MainPage);
