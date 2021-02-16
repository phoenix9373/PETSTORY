import React from 'react';
import styles from './NavbarIcons.module.css';

// Material UI
import { makeStyles } from '@material-ui/core/styles';
import { Badge } from '@material-ui/core';
import NotificationsIcon from '@material-ui/icons/Notifications';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const useStyle = makeStyles(() => ({
  icon: {
    fontSize: 30,
    color: 'rgba(0, 0, 0, 0.5)',
    borderRadius: '50%',
    width: 40,
    height: 40,
    padding: 5,
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
    },
    cursor: 'pointer',
  },
}));

function NavbarIcons(props) {
  const classes = useStyle();
  return (
    <div className={styles.frame}>
      {/* 알림 */}
      <NotificationsIcon className={classes.icon} />
      {/* 프로필 */}
      <AccountCircleIcon className={classes.icon}></AccountCircleIcon>
      {/* 로그아웃 */}
    </div>
  );
}

export default NavbarIcons;
