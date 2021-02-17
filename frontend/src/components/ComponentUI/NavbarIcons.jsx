import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import styles from './NavbarIcons.module.css';
import axios from 'axios';

// Material UI
import { makeStyles } from '@material-ui/core/styles';
import NotificationsIcon from '@material-ui/icons/Notifications';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

// React Icon
import { GiBirdHouse } from 'react-icons/gi';
import { CgSelectR, CgProfile } from 'react-icons/cg';
import { RiLogoutBoxRLine } from 'react-icons/ri';

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

function NavbarIcons({ handleIsFocus, isFocus, history }) {
  const classes = useStyle();
  const [isAlarmData, setIsAlarmData] = useState(false);
  const [isProfileData, setIsProfileData] = useState(false);

  const getAlarmData = () => {
    setIsAlarmData(!isAlarmData);
    setIsProfileData(false);
    handleIsFocus(false);
    const profileId = localStorage.getItem('profileId');

    axios
      .get(`/api/main/alarmclick/${profileId}`)
      .then((res) => {
        console.log('알람데이터', res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getProfileData = () => {
    setIsProfileData(!isProfileData);
    setIsAlarmData(false);
    handleIsFocus(false);
  };

  const onfocusHandler = (e) => {
    console.log(e);
    setIsAlarmData(true);
  };
  const onblurHandler = (e) => {
    console.log(e);
    setIsAlarmData(false);
  };
  const myProfileHandler = (e) => {
    setIsAlarmData(false);
    setIsProfileData(false);
    handleIsFocus(false);
    const profileId = localStorage.getItem('profileId');
    history.push(`/profile/${profileId}`);
  };
  const profileSelectHandler = (e) => {
    setIsAlarmData(false);
    setIsProfileData(false);
    handleIsFocus(false);
    history.push('/select');
  };

  const memberHandler = (e) => {
    setIsAlarmData(false);
    setIsProfileData(false);
    handleIsFocus(false);
    history.push('/userdetail');
  };
  const logoutHandler = (e) => {
    localStorage.removeItem('user');
    localStorage.removeItem('profileId');
    window.location.replace('/login');
  };

  const scrollHandler = (e) => {
    setIsAlarmData(false);
    setIsProfileData(false);
    handleIsFocus(false);
  };

  window.addEventListener('scroll', scrollHandler);
  return (
    <>
      <div className={styles.frame}>
        {/* 알림 */}
        <NotificationsIcon
          className={classes.icon}
          onClick={getAlarmData}
          onFocus={onfocusHandler}
          onBlur={onblurHandler}
        />
        {isAlarmData && !isFocus && (
          <ul className={styles.wrapper}>
            <>
              <li className={styles.item}>알람</li>
            </>
          </ul>
        )}
        {/* 프로필 */}

        <AccountCircleIcon
          className={classes.icon}
          onClick={getProfileData}
        ></AccountCircleIcon>
        {isProfileData && !isFocus && (
          <ul className={styles.wrapper2}>
            <li className={styles.item2} onClick={myProfileHandler}>
              <GiBirdHouse className={styles.icon} />
              <span className={styles.span}>마이 프로필</span>
            </li>
            <li className={styles.item2} onClick={profileSelectHandler}>
              <CgSelectR className={styles.icon} />
              <span className={styles.span}>프로필 선택</span>
            </li>
            <li className={styles.item2} onClick={memberHandler}>
              <CgProfile className={styles.icon} />
              <span className={styles.span}>회원정보 수정</span>
            </li>
            <li className={styles.item3} onClick={logoutHandler}>
              <RiLogoutBoxRLine className={styles.icon2} />
              <span className={styles.span}>로그아웃</span>
            </li>
          </ul>
        )}
      </div>
    </>
  );
}

export default withRouter(NavbarIcons);
