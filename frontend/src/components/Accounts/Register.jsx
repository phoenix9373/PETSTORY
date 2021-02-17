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

  const chkPW = () => {
    const pw = Password;
    const num = pw.search(/[0-9]/g);
    const eng = pw.search(/[a-z]/gi);
    const spe = pw.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi);

    if (pw.length < 8 || pw.length > 20) {
      toast.error('8자리 ~ 20자리 이내로 입력해주세요.');
      return false;
    } else if (pw.search(/\s/) !== -1) {
      toast.error('비밀번호는 공백 없이 입력해주세요.');
      return false;
    } else if (num < 0 || eng < 0 || spe < 0) {
      toast.error('영문,숫자, 특수문자를 혼합하여 입력해주세요.');
      return false;
    } else {
      return true;
    }
  };

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

    if (!chkPW()) {
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
