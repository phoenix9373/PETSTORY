import React, { useState } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import './Account.css';
import RegisterPage from '../../components/Accounts/Register/RegisterPage';
import LoginPage from '../../components/Accounts/Login/LoginPage';

function Account({ authenticated, login, location }) {
  const [isActive, setActive] = useState(false);

  const toggleClass = () => {
    const stateActive = isActive;
    setActive(!stateActive);
  };

  const { from } = location.state || { from: { pathname: '/' } };
  if (authenticated) return <Redirect to={from} />;

  return (
    <div className="acoountbody">
      <div
        className={isActive ? 'container right-panel-active' : 'container'}
        id="container"
      >
        <RegisterPage />
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
                로그인
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
                회원가입
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withRouter(Account);
