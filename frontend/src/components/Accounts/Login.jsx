import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../_actions/userAction';
import toast from 'react-hot-toast';
import kakaoIcon from '../../assets/kakaotalk.png';
import { FcGoogle } from 'react-icons/fc';
import KakaoLogin from './KakaoLogin';

function LoginPage(props) {
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const dispatch = useDispatch();
  const onEmailHandler = (e) => {
    setEmail(e.currentTarget.value);
  };
  const onPasswordHanlder = (e) => {
    setPassword(e.currentTarget.value);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (Email === '' || Email === undefined || Email === null) {
      toast.error('이메일을 입력하세요');
      return;
    }

    if (Password === '' || Password === undefined || Password === null) {
      toast.error('비밀번호를 입력하세요');
      return;
    }
    // 로그인을 진행하기위해서
    // 첫번째 useDispatch(액션) 을 활용해서 액션을 dispatch해준다
    const body = {
      email: Email,
      password: Password,
    };
    console.log(body);
    dispatch(loginUser(body))
      .then((res) => {
        console.log(res);
        if (res.payload !== undefined) {
          localStorage.setItem('user', JSON.stringify(res.payload));
          props.history.push('/select');
          window.location.reload();
        } else {
          toast.error('잘못된 정보를 입력하셧습니다.');
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <>
      <div className="form-container sign-in-container">
        <form className="acccount__form" onSubmit={onSubmitHandler}>
          <h1>Sign in</h1>
          <KakaoLogin props={props} />
          {/* <div className="social-container">
            <a className="account__a" href="#" className="social">
              <img className="account__kakao" src={kakaoIcon} />
            </a>
            <a className="account__a" href="#" className="social">
              <FcGoogle className="account__kakao" />
            </a>
          </div> */}
          <span className="account__span">or use your account</span>
          <input
            className="account__input"
            type="email"
            value={Email}
            placeholder="Email"
            onChange={onEmailHandler}
          />
          <input
            className="account__input"
            type="password"
            value={Password}
            placeholder="Password"
            onChange={onPasswordHanlder}
          />
          <button className="account__button" type="submit">
            SIGN IN
          </button>
        </form>
      </div>
    </>
  );
}

export default withRouter(LoginPage);
