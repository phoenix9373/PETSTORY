import { makeStyles, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import FeedDetail from '../../components/Feed/FeedDetail';
import FeedInfinite from '../../components/Feed/FeedInfinite';

const useStyles = makeStyles((theme) => ({
  root: {
    // display: 'inline-block',
    margin: '0 auto',
    fontSize: 'large',
  },
}));

function MainPage({ match, history }) {
  const { boardId } = match.params;
  const classes = useStyles();

  return (
    <div>
      <FeedDetail history={history} boardId={boardId} />
      <br />
      <Typography variant="h4" align="center" gutterBottom gutterTop>
        유사한 피드 목록
      </Typography>
      <FeedInfinite></FeedInfinite>
    </div>
  );
}

export default withRouter(MainPage);
