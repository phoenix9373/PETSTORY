import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import FeedDetail from '../../components/Feed/FeedDetail';
import FeedFrame from '../../components/Feed/FeedFrame';
import FeedInfinite from '../../components/Feed/FeedInfinite';
import FeedInfiniteCopy from '../../components/Feed/FeedInfiniteCopy';

function MainPage(props) {
  return (
    <div>
      {/* <FeedFrame /> */}
      {/* <FeedDetail /> */}
      <FeedInfinite />
    </div>
  );
}

export default withRouter(MainPage);
