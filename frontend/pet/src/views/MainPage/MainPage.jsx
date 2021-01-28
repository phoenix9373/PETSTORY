import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import FeedFrame from '../../components/Feed/FeedFrame';

function MainPage(props) {
  return (
    <div>
      <FeedFrame></FeedFrame>
    </div>
  );
}

export default withRouter(MainPage);
