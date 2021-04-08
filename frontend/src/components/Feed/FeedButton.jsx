import { useState, useRef, useEffect } from 'react';

// Components
import FeedSaveContainer from './FeedSaveContainer';
import { Menu, MenuItem, Button, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { request } from '../../utils/axios';
import MenuDropdown from '../ComponentUI/MenuDropdown';
import toast, { Toaster } from 'react-hot-toast';

// CSS
import styles from './FeedButton.module.css';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#fafafa',
  },
  button: {
    // 기본 버튼 스타일
    '&, &:hover': {
      outline: 0,
      border: 0,
    },
  },
  right: {
    // 우측 버튼 - 저장
    color: 'white',
    backgroundColor: '#ff1744',
    borderRadius: '0 10px 10px 0',
    padding: '8px 30px',
    '&:hover': {
      backgroundColor: '#c4001d',
    },
  },
  left: {
    // 좌측 버튼 - 저장소 선택
    backgroundColor: '#fafafa',
    borderRadius: '10px 0 0 10px',
    paddingRight: '30px',
    paddingLeft: '30px',
    '&:hover': {
      backgroundColor: '#c2c2c2',
    },
  },
  frame: {
    // 버튼 요소를 담고 있는 프레임.
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    top: 20,
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 1,
    width: '100%',
    '&:hover .button': {
      display: 'inline-block',
    },
  },
}));

const options = ['Cats', 'Dogs', 'My Collection'];

function FeedButton(props) {
  // State

  // Data
  const memberId = props.memberId;
  const boardId = props.boardId;
  const postList = props.postList;
  const [memberPostlistId, setMemberPostlistId] = useState(null);

  // 커스텀 스타일
  const classes = useStyles();

  const handleSave = () => {
    const data = {
      memberId,
      memberPostlistId,
      boardId,
    };

    // 피드 세이브 요청
    request('POST', '/api/postlist/add', data);
    toast.success('저장을 완료했습니다.');
  };

  const handleMemberPostlistId = (id) => {
    setMemberPostlistId(() => id);
  };

  const getDefaultData = async () => {
    const response = await request(
      'GET',
      `/api/memberPostlist/findAll/${
        JSON.parse(localStorage.getItem('user')).id
      }`,
    );

    setMemberPostlistId(
      () =>
        response.data && response.data[0] && response.data[0].memberPostlistId,
    );
  };

  useEffect(() => {
    getDefaultData();
  }, []);

  return (
    <Box className={`${classes.frame} active`}>
      {/* 피드 저장소 리스트 버튼 */}
      <MenuDropdown
        postList={postList}
        handleMemberPostlistId={handleMemberPostlistId}
      ></MenuDropdown>
      {/* <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
        className={`${classes.button} ${classes.left}`}
      >
        <FeedSaveContainer
          text={
            postList[selectedIndex]
              ? postList[selectedIndex].postlistName
              : '저장 위치 선택'
          }
        ></FeedSaveContainer>
      </Button>
      <Menu
        className="menu__frame"
        id="simple-menu"
        anchorEl={anchorEl}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: 'middle',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {postList ? (
          postList.map((post, index) => (
            <MenuItem
              key={post.memberPostlistId}
              selected={index === selectedIndex}
              onClick={(event) => handleMenuItemClick(event, index)}
            >
              {post.postlistName}
            </MenuItem>
          ))
        ) : (
          <MenuItem
            key={new Date()}
            // selected={index === selectedIndex}
            onClick={handleClose}
          >
            저장 목록이 없습니다.
          </MenuItem>
        )}
      </Menu> */}

      {/* 피드 저장 버튼 */}
      <Button
        className={`${classes.button} ${classes.right}`}
        onClick={handleSave}
      >
        저장
      </Button>
    </Box>
  );
}

export default FeedButton;
