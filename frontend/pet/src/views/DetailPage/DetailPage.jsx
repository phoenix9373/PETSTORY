import { makeStyles, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import FeedDetail from '../../components/Feed/FeedDetail';
import FeedSimilar from '../../components/ComponentUI/FeedSimilar';
import { withRouter } from 'react-router-dom';
import { request } from '../../utils/axios';

function MainPage({ match, history }) {
  const [getSemiliarItemList, setGetSemiliarItemList] = useState([]);

  const { boardId } = match.params;

  async function getFeedSemilarData() {
    const feed = await request(
      'GET',
      `/api/board/findOne/${Number(boardId)}`,
      {},
      {},
    );

    setGetSemiliarItemList(() => feed.data.relatedBoards);
  }

  useEffect(() => {
    getFeedSemilarData();
  }, []);

  return (
    <div>
      <FeedDetail history={history} boardId={Number(boardId)} />
      <br />
      <Typography variant="h4" align="center" gutterBottom gutterTop>
        유사한 피드 목록
      </Typography>
      <FeedSimilar feedItems={getSemiliarItemList}></FeedSimilar>
    </div>
  );
}

export default withRouter(MainPage);
