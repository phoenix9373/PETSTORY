import React, { useState } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import { useHistory } from 'react-router-dom';
// material UI
import { IconButton, makeStyles, Menu, MenuItem } from '@material-ui/core';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import './ConfirmAlert.css';
// compoenents
import LoginUserMenuItem from '../ComponentUI/LoginUserMenuItem';
import { request } from '../../utils/axios';

const useStyles = makeStyles((theme) => ({
  delete: {
    color: '#ff1744',
    '&:hover': {
      color: 'white',
      backgroundColor: '#ff1744',
      borderRadius: 5,
    },
  },
  modify: {
    color: '#1976d2',
    '&:hover': {
      color: 'white',
      backgroundColor: '#1976d2',
      borderRadius: 5,
    },
  },
}));

function ListMenu(props) {
  // Material UI 커스텀 클래스
  const [anchorEl, setAnchorEl] = useState(null);
  const classes = props.useClasses;
  const customClasses = useStyles();

  const history = useHistory();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {
    // 삭제 요청
    request('DELETE', `/api/board/delete/${props.boardId}`);
    window.location.href = '/';
  };

  const handleModify = () => {
    // 수정 요청
    console.log(props.history);
    history.push(`/update/${props.boardId}`, props.feedItem); // 수정하는 곳으로 이동해야함. not detail.
  };
  const submit = () => {
    confirmAlert({
      title: '삭제?',
      message: '정말 삭제하시겠습니까?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => handleDelete(),
        },
        {
          label: 'No',
        },
      ],
    });
  };
  return (
    <>
      <IconButton
        className={classes}
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreHorizIcon fontSize="default" />
      </IconButton>

      <Menu
        id="simple-menu"
        getContentAnchorEl={null}
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
        <MenuItem onClick={handleClose}>팔로우 요청</MenuItem>
        {Number(localStorage.getItem('profileId')) === props.profileId && (
          <MenuItem className={customClasses.modify} onClick={handleModify}>
            수정
          </MenuItem>
        )}
        {Number(localStorage.getItem('profileId')) === props.profileId && (
          <MenuItem className={customClasses.delete} onClick={submit}>
            삭제
          </MenuItem>
        )}
      </Menu>
    </>
  );
}

export default ListMenu;
