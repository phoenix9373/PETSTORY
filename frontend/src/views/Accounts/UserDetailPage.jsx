import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { userDetail } from '../../_actions/userAction';
import styles from './UserDetailPage.module.css';
import axios from 'axios';

function UserDetail() {
  const [user, setUser] = useState('a');
  const dispatch = useDispatch();
  const loginUser = JSON.parse(localStorage.getItem('user'));
  const userId = loginUser.id;

  const getUser = () => {
    dispatch(userDetail(userId))
      .then((res) => {
        setUser(res.payload);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const onUpdateMember = (e) => {
    console.log(e);
  };
  const onDeleteMember = (e) => {
    const userId = JSON.parse(localStorage.getItem('user')).id;
    axios
      .delete(`/api/member/delete/${userId}`)
      .then((res) => {
        console.log(res);
        localStorage.removeItem('profileId');
        localStorage.removeItem('user');
        window.location.href = '/login';
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.title}> 회원정보 수정</div>
        <div className={styles.email}>{user.email}</div>
        <div className={styles.name}>{user.member_name}</div>
        <div className={styles.buttonWrapper}>
          <button className={styles.button} onClick={onUpdateMember}>
            회원정보 수정
          </button>
          <button className={styles.button} onClick={onDeleteMember}>
            회원탈퇴
          </button>
        </div>
      </div>
    </>
  );
}

export default withRouter(UserDetail);
