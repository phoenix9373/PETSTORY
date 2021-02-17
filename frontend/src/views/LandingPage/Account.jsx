import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import './Account.scss';
import RegisterPage from '../../components/Accounts/Register';
import LoginPage from '../../components/Accounts/Login';
import toast, { Toaster } from 'react-hot-toast';
import back from '../../assets/back.mp4';

function Account({ history }) {
  if (localStorage.getItem('user')) {
    history.goBack();
  }

  const [isActive, setActive] = useState(false);
  const toggleClass = () => {
    setActive(!isActive);
    if (isActive) {
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

  // 중앙 버블 만드는 js
  const bubbleLifeTime = 10;
  const noOfBubbles = 80;

  function createCircle() {
    const circle = document.createElement('div');
    circle.classList.add('circle');
    circle.style.animationDelay = `${Math.random() * bubbleLifeTime}s`;

    const side = `${10 + Math.floor(Math.random() * 10)}px`;
    circle.style.width = side;
    circle.style.height = side;

    return circle;
  }

  function createBubble() {
    const circleContainer = document.createElement('div');
    circleContainer.classList.add('circle_container');
    circleContainer.style.transform = `rotate(${Math.floor(
      Math.random() * 360,
    )}deg)`;

    const circle = createCircle();
    circleContainer.appendChild(circle);

    return circleContainer;
  }

  function init() {
    let bubble;
    const wrapper = document.querySelector('.intro__wrapper');
    for (let i = 0; i < noOfBubbles; i++) {
      bubble = createBubble();
      wrapper.appendChild(bubble);
    }
  }

  useEffect(() => {
    init();
  }, []);

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
        <div className="intro__wrapper">
          <div className="intro__container">
            <div className="intro__name">PetStory</div>
          </div>
        </div>
        {goLogin ? (
          ''
        ) : (
          <button onClick={goLoginHandler} className="account__gologinbtn">
            우리 사이트에 들어와 볼래?
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
