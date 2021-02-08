import React, { useState } from 'react';
import FeedButton from './FeedButton';

// css 파일
import styles from './FeedItem.module.css';

// material UI
import { makeStyles } from '@material-ui/core/styles';
import { IconButton, Menu, MenuItem } from '@material-ui/core';
import Fab from '@material-ui/core/Fab';
import ShareIcon from '@material-ui/icons/Share';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

// material UI Style 커스터마이징 - styles

// material UI Style 커스터마이징 - styles
const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    margin: '10px 0',
    width: 200,
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
      display: 'inline-block',
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
  },
}));

function FeedItem(props) {
  // Material UI 커스텀 클래스
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  function handleShare() {
    // 피드 공유 요청, dialog 창 띄우기.
    console.log('피드 공유 요청');
  }

  return (
    <div className={classes.root}>
      {/* 이미지 요소 */}
      <img className={classes.image} src={props.imageSrc} alt="cat" />
      {/* 버튼 요소 */}
      <FeedButton />
      {/* 아이콘 요소 */}
      <div className="wrapper">
        <Fab
          className="icon left"
          size="small"
          color="primary"
          aria-label="add"
          onClick={handleShare}
        >
          <ShareIcon fontSize="default" />
        </Fab>

        <IconButton
          className="icon right"
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          <MoreHorizIcon fontSize="default" />
        </IconButton>

        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'bottom',
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
          <MenuItem onClick={handleClose}>신고하기</MenuItem>
          <MenuItem onClick={handleClose}>숨기기</MenuItem>
          <MenuItem onClick={handleClose}>팔로우 요청</MenuItem>
        </Menu>
      </div>
    </div>
  );
}

export default FeedItem;
