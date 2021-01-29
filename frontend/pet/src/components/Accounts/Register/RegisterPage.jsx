import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../../_actions/userAction';
import './RegisterPage.css';

function RegisterPage(props) {
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [Name, setName] = useState('');
  const [ConfirmPasword, setConfirmPasword] = useState('');
  const dispatch = useDispatch();

  const onEmailHandler = (e) => {
    setEmail(e.currentTarget.value);
  };

  const onNameHandler = (e) => {
    setName(e.currentTarget.value);
  };

  const onPasswordHanlder = (e) => {
    setPassword(e.currentTarget.value);
  };

  const onConfirmPasswordHandler = (e) => {
    setConfirmPasword(e.currentTarget.value);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (Password === ConfirmPasword) {
      const body = {
        email: Email,
        member_name: Name,
        password: Password,
      };

      dispatch(registerUser(body)).then((res) => {
        // eslint-disable-next-line
        alert('가입이 정상적으로 완료되었습니다');
        props.history.push('/');
      });
    } else {
      // eslint-disable-next-line
      alert('비밀번호가 일치하지 않습니다');
    }
  };

  return (
    <div className="form-container sign-up-container">
      <form onSubmit={onSubmitHandler}>
        <h1>Create Account</h1>
        <div className="social-container">
          <a href="#" className="social">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="#" className="social">
            <i className="fab fa-google-plus-g"></i>
          </a>
        </div>
        <span>or use your email for registration</span>
        <input
          type="email"
          placeholder="Email"
          value={Email}
          onChange={onEmailHandler}
        />
        <input
          type="text"
          placeholder="Name"
          value={Name}
          onChange={onNameHandler}
        />
        <input
          type="password"
          placeholder="Password"
          value={Password}
          onChange={onPasswordHanlder}
        />
        <input
          type="password"
          placeholder="Password Comfirmation"
          value={ConfirmPasword}
          onChange={onConfirmPasswordHandler}
        />
        <button type="submit">회원가입</button>
      </form>
    </div>
  );
}

export default withRouter(RegisterPage);
