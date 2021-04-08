import React, { useState, Component } from 'react';
import { useDispatch } from 'react-redux';
import { getLikeBoard } from '../../_actions/profileAction';
import UserFeedsTabsItem from './UserFeedsTabsItem';

// css
import styles from './UserFeedsTabs.module.css';
// MUI
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';

function UserFeedsTabs(props) {
  const [value, setValue] = useState(0);
  const [likeBoard, setLikeBoard] = useState(null);

  const handleChange = (event, value) => {
    setValue(value);
  };

  const dispatch = useDispatch();
  const profileId = props.profile.profileId;
  const handleLikeBoard = async () => {
    await dispatch(getLikeBoard(profileId)).then((res) => {
      setLikeBoard(res.payload.data);
    });
  };

  return (
    <Paper square>
      <Tabs
        value={value} // 왼쪽 value는 Tab과 관련된 고정값, 바꾸면 안돼 / 오른쪽 value: reactHook
        indicatorColor="primary"
        textColor="primary"
        onChange={handleChange}
        aria-label="disabled tabs example"
      >
        <Tab label="My Story" />
        <Tab label="Likes" onClick={handleLikeBoard} />
      </Tabs>
      {/* 내가 쓴 게시물 */}
      <TabPanel value={value} index={0}>
        {/* props defined 에러 난 이유: 여기는 UI 자리인데 html태그없이 써서 + 함수컴포넌트니까 this안쓰고 인자로 props */}
        {props.profile.boardQueryDtos.length === 0 ? (
          <p>작성한 글이 없습니다..</p>
        ) : (
          props.profile.boardQueryDtos.map((article, index) => (
            <div className={styles.allImg} key={article.boardId}>
              {article.files ? (
                <UserFeedsTabsItem article={article} />
              ) : (
                <p>이미지가 없는 게시물</p>
              )}
            </div>
          ))
        )}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {likeBoard === null || likeBoard.length === 0 ? (
          <p>좋아요한 글이 없습니다.</p>
        ) : (
          likeBoard.map((article, index) => (
            <div className={styles.allImg} key={article.boardId}>
              {article.files ? (
                <UserFeedsTabsItem article={article} />
              ) : (
                <p>이미지가 없는 게시물</p>
              )}
            </div>
          ))
        )}
      </TabPanel>
    </Paper>
  );
}

class TabPanel extends Component {
  render() {
    return (
      <div hidden={this.props.value !== this.props.index}>
        <Box p={2}>{this.props.children}</Box>
      </div>
    );
  }
}

export default UserFeedsTabs;
