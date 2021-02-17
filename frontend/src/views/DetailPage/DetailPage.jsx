import { makeStyles, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { request } from '../../utils/axios';

// Components
import FeedItem from '../../components/Feed/FeedItem';
import FeedDetail from '../../components/Feed/FeedDetail';
import FeedSimilar from '../../components/ComponentUI/FeedSimilar';

function MainPage({ match, history }) {
  const [getSemiliarItemList, setGetSemiliarItemList] = useState([]);
  const [items, setItems] = useState([]);
  const [boardItems, setBoardItems] = useState([]);

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

  function loadItems(groupKey) {
    // 그룹키, 개수, start 인덱스
    const newItems = [...boardItems].map(
      (item) =>
        item.files && (
          <FeedItem groupKey={groupKey} key={item.boardId} feedItem={item} />
        ),
    );

    setItems(() => newItems);
    return newItems;
  }

  async function getIntroMessage(id) {
    return new Promise((resolve, reject) => {
      const res = request('GET', `/api/board/findOne/${id}`);
      resolve(res);
    });
  }

  async function getItems() {
    const boardList = getSemiliarItemList;
    const itemList = await Promise.all(
      boardList.map((item) => getIntroMessage(item.boardId)),
    );
    const newItemList = itemList.map((item) => item.data);
    setBoardItems((prev) => newItemList.concat(prev));
  }

  useEffect(() => {
    getItems();
  }, [getSemiliarItemList]);

  useEffect(() => {
    loadItems();
  }, [boardItems]);

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
      <FeedSimilar feedItems={items}></FeedSimilar>
    </div>
  );
}

export default withRouter(MainPage);
