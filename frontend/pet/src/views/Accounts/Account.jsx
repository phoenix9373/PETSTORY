import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import './Account.css';
import RegisterPage from '../../components/Accounts/Register/RegisterPage';
import LoginPage from '../../components/Accounts/Login/LoginPage';
import toast, { Toaster } from 'react-hot-toast';
import back from '../../assets/back.mp4';

function Account({ history }) {
  if (localStorage.getItem('user')) {
    history.goBack();
  }

  const [isActive, setActive] = useState(false);
  const toggleClass = () => {
    const stateActive = isActive;
    setActive(!stateActive);
    if (stateActive) {
      toast.success('로그인 페이지 입니다.');
    } else {
      toast.success('회원가입 페이지 입니다.');
    }
  };

  const [goLogin, setgoLogin] = useState(false);
  const goLoginHandler = () => {
    const stategoLogin = goLogin;
    setgoLogin(!stategoLogin);
  };

  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={true}
        toastOptions={{
          duration: 1000,
          style: {
            border: '1px solid #713200',
            padding: '16px',
            margin: '10vh',
            color: '#713200',
          },
        }}
      />
      <div className="acoountbody">
        <video id="backVideo" src={back} type="video/mp4" autoPlay loop muted />
        {goLogin ? (
          ''
        ) : (
          <button onClick={goLoginHandler} className="account__gologinbtn">
            우리 사이트에 들어와볼래?
          </button>
        )}
        <div
          className={`${
            isActive ? 'container right-panel-active' : 'container'
          } ${goLogin ? 'containeractive' : ''}`}
          id="container"
        >
          <RegisterPage toggleClass={toggleClass} />
          <LoginPage />
          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <h1>Welcome Back!</h1>
                <p>이미 계정을 만드셨다면 아래의 버튼을 눌러주세요</p>
                <button
                  className="account__button ghost"
                  id="signIn"
                  onClick={toggleClass}
                >
                  SIGN IN
                </button>
              </div>
              <div className="overlay-panel overlay-right">
                <h1>Hello, Friend!</h1>
                <p>Petstory에 참여하고 싶다면 아래의 버튼을 눌러주세요</p>
                <button
                  className="account__button ghost"
                  id="signUp"
                  onClick={toggleClass}
                >
                  SIGN UP
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default withRouter(Account);
