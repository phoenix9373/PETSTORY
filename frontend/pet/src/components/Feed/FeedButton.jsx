import { useState, useRef } from 'react';

// Components
import FeedSaveContainer from './FeedSaveContainer';
import { Menu, MenuItem, Button, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

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
    '&:hover': {
      backgroundColor: '#c4001d',
    },
  },
  left: {
    // 좌측 버튼 - 저장소 선택
    backgroundColor: '#fafafa',
    borderRadius: '10px 0 0 10px',
    '&:hover': {
      backgroundColor: '#c2c2c2',
    },
  },
  frame: {
    // 버튼 요소를 담고 있는 프레임.
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    top: 10,
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 1,
    width: '90%',
    '&:hover .button': {
      display: 'inline-block',
    },
  },
}));

function FeedButton(props) {
  // State
  const [anchorEl, setAnchorEl] = useState(null);

  // Ref
  const feedSaver = useRef('내 피드');

  // 커스텀 스타일
  const classes = useStyles();

  // Methods
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  function handleSave() {
    // 피드 세이브 요청
    console.log('save');
  }

  return (
    <Box className={`${classes.frame} active`}>
      {/* 피드 저장소 리스트 버튼 */}
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
        className={`${classes.button} ${classes.left}`}
      >
        <FeedSaveContainer></FeedSaveContainer>
      </Button>
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
        <MenuItem onClick={handleClose}>Cats</MenuItem>
        <MenuItem onClick={handleClose}>Dogs</MenuItem>
        <MenuItem onClick={handleClose}>My Collection</MenuItem>
      </Menu>

      {/* 피드 저장 버튼 */}
      <Button
        className={`${classes.button} ${classes.right}`}
        onClick={handleSave}
      >
        <span>저장</span>
      </Button>
    </Box>
  );
}

export default FeedButton;
