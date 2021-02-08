import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../_actions/userAction';
import toast from 'react-hot-toast';

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
    if (Email === '' || Email === undefined || Email === null) {
      toast.error('이메일을 입력하세요');
      return;
    }

    if (Name === '' || Name === undefined || Name === null) {
      toast.error('이름을 입력하세요');
      return;
    }

    if (Password === '' || Password === undefined || Password === null) {
      toast.error('비밀번호를 입력하세요');
      return;
    }

    if (Password === ConfirmPasword) {
      const body = {
        email: Email,
        member_name: Name,
        password: Password,
      };

      dispatch(registerUser(body)).then((res) => {
        props.toggleClass();
        toast.success('회원가입이 완료되었습니다.');
      });
    } else {
      toast.error('비밀번호가 일치하지 않습니다');
    }
  };

  return (
    <>
      <div className="form-container sign-up-container">
        <form className="acccount__form" onSubmit={onSubmitHandler}>
          <h1>Create Account</h1>
          <input
            className="account__input"
            type="email"
            placeholder="Email"
            value={Email}
            onChange={onEmailHandler}
          />
          <input
            className="account__input"
            type="text"
            placeholder="Name"
            value={Name}
            onChange={onNameHandler}
          />
          <input
            className="account__input"
            type="password"
            placeholder="Password"
            value={Password}
            onChange={onPasswordHanlder}
          />
          <input
            className="account__input"
            type="password"
            placeholder="Password Comfirmation"
            value={ConfirmPasword}
            onChange={onConfirmPasswordHandler}
          />
          <button className="account__button" type="submit">
            SIGN UP
          </button>
        </form>
      </div>
    </>
  );
}

export default withRouter(RegisterPage);
