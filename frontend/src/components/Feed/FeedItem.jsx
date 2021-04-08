import React, { useEffect, useState } from 'react';

import { useHistory } from 'react-router-dom';

// material UI
import { makeStyles } from '@material-ui/core/styles';
import { IconButton, Menu, MenuItem } from '@material-ui/core';
import { MoreHoriz } from '@material-ui/icons';
import { request } from '../../utils/axios';

// Components
import MenuDropdown from '../ComponentUI/MenuDropdown';
import FeedButton from './FeedButton';
import FeedProfile from './FeedProfile';

// material UI Style 커스터마이징 - styles
const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    margin: '10px 0',
    width: 300,
    height: 'auto',
    '& > *': {
      margin: 0,
      padding: 0,
    },
    '& > .wrapper > .icon': {
      display: 'none',
    },
    '&:hover > .wrapper > .icon': {
      display: 'inline-block',
      cursor: 'pointer',
      boxShadow: '0 0 10px 1px #c2c2c2',

      position: 'absolute',
      bottom: 15,
      right: 10,

      fontSize: 18,
      padding: 8,
      borderRadius: '50%',

      backgroundColor: 'white',
      color: 'black',
    },
    '& > .wrapper > .icon.left': {
      right: 60,
    },
    '& .active': {
      display: 'none',
    },
    '&:hover .active': {
      display: 'flex',
    },
  },
  image: {
    display: 'block',
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: 10,
    border: 0,
    boxShadow: '0px 0px 3px gray',
    cursor: 'zoom-in',
  },
  icon: {
    position: 'relative',
  },
}));

const options = ['신고하기', '팔로우 요청'];

function FeedItem(props) {
  // Data
  const feedItem = props.feedItem;
  const memberId = JSON.parse(localStorage.getItem('user')).id;

  // State
  // const [anchorEl, setAnchorEl] = useState(null);
  // const [selectedIndex, setSelectedIndex] = useState(options[0]);
  const [postList, setPostList] = useState([]);
  const [commentCount, setCommentCount] = useState(0);

  // Material UI 커스텀 클래스
  const classes = useStyles();
  const history = useHistory();

  // const handleClick = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };

  // const handleClose = () => {
  //   setAnchorEl(null);
  // };

  const handleDetail = () => {
    history.push(`/detail/${feedItem.boardId}`, feedItem);
  };

  // const handleMenuItemClick = (event, index) => {
  //   setSelectedIndex(index);
  //   setAnchorEl(null);
  // };

  // 포스트 리스트 데이터 가져오기.
  const getFetchPostList = async () => {
    const response = await request(
      'GET',
      `/api/memberPostlist/findAll/${memberId}`,
    );

    setPostList(() => response && response.data);
  };

  const fetchDetail = async () => {
    const comment = await request(
      'GET',
      `/api/comment/findAll/${feedItem.boardId}`,
      {},
      {},
    );

    if (comment && comment.data) {
      setCommentCount(() => comment.data.length);
    }
  };

  useEffect(() => {
    fetchDetail();
    getFetchPostList();
  }, []);

  return (
    <div>
      <div className={classes.root}>
        {/* 이미지 요소 */}
        <img
          onClick={handleDetail}
          className={classes.image}
          src={feedItem.files[0] && feedItem.files[0].imgFullPath}
          alt="cat"
        />
        {/* 버튼 요소 */}
        <FeedButton
          boardId={feedItem.boardId}
          memberId={memberId}
          postList={postList}
        />
        {/* 아이콘 요소 */}
        {/* <div className="wrapper">
          <IconButton
            className={classes.icon}
            className="icon right"
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleClick}
          >
            <MoreHoriz fontSize="default" />
          </IconButton>

          <Menu
            id="simple-menu"
            className={classes.icon}
            getContentAnchorEl={null}
            anchorEl={anchorEl}
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
            {options.map((option, index) => (
              <MenuItem
                key={option}
                // disabled={index === 0}
                selected={index === selectedIndex}
                onClick={handleClose}
                onClick={(event) => handleMenuItemClick(event, index)} // 선택한 값이 달라질 때마다 요청 보내는게 달라짐.
              >
                {option}
              </MenuItem>
            ))}
          </Menu>
        </div> */}
      </div>
      <FeedProfile
        commentCount={commentCount}
        feedItem={feedItem}
      ></FeedProfile>
    </div>
  );
}

export default FeedItem;
