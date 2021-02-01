import React from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../_actions/userAction';

function LandingPage(props) {
  const dispatch = useDispatch();
  const onClickHandler = () => {
    // useDispatch를 사용해서 로그아웃 액션을 실행한다
    // useDispatch와 logout 액션이 두가지 필요하다
    dispatch(logoutUser())
      .then((res) => {
        console.log(res);
        if (res.payload.success) {
          props.history.push('/login');
        } else {
          // eslint-disable-next-line
          alert('로그아웃에 실패하였습니다');
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div
      style={{
        background: '#f6f5f7',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100vh',
      }}
    >
      <h2>시작 페이지</h2>
      {/* <button onClick={onClickHandler}>로그아웃</button> */}
    </div>
  );
}

export default withRouter(LandingPage);
