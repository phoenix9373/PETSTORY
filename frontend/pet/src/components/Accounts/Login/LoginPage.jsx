import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../../_actions/userAction';
// import KaKaoLogins from '../SocialLogin/KakaoLogin';
// import GoogleLogins from '../SocialLogin/GoogleLogins';

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
    // 로그인을 진행하기위해서
    // 첫번째 useDispatch(액션) 을 활용해서 액션을 dispatch해준다
    const body = {
      email: Email,
      password: Password,
    };

    dispatch(loginUser(body))
      .then((res) => {
        console.log(res);
        if (res.payload.loginSuccess) {
          props.history.push('/');
        } else {
          // eslint-disable-next-line
          alert(res.payload.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="form-container sign-in-container">
      <form className="acccount__form" onSubmit={onSubmitHandler}>
        <h1>Sign in</h1>
        <div className="social-container">
          <a href="#" className="social"></a>
          <a href="#" className="social"></a>
        </div>
        <span>or use your account</span>
        {/* <GoogleLogins />
        <KaKaoLogins /> */}
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
        <a href="#">Forgot your password?</a>
        <button className="account__button" type="submit">
          로그인
        </button>
      </form>
    </div>
  );
}

export default withRouter(LoginPage);
