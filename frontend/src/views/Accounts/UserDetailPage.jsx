import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { userDetail } from '../../_actions/userAction';

function UserDetail() {
  const [user, setUser] = useState('a');
  const dispatch = useDispatch();
  const loginUser = JSON.parse(localStorage.getItem('user'));
  const userId = loginUser.id;

  const getUser = () => {
    dispatch(userDetail(userId))
      .then((res) => {
        console.log(res.payload);
        setUser(res.payload);
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
      <div>회원의 Email : {user.email}</div>
      <div>회원의 이름 : {user.member_name}</div>
      <button>회원정보 수정</button>
    </>
  );
}

export default withRouter(UserDetail);
