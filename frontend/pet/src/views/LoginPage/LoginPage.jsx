import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../_actions/userAction';
// import KaLogin from './SocialLogin/kaLogin';

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
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '50vh',
        }}
      >
        <form
          onSubmit={onSubmitHandler}
          style={{ display: 'flex', flexDirection: 'column' }}
        >
          <label>Email</label>
          <input type="email" value={Email} onChange={onEmailHandler} />
          <label>Password</label>
          <input
            type="password"
            value={Password}
            onChange={onPasswordHanlder}
          />
          <br />
          <button type="submit">Login</button>
        </form>
      </div>
      <div>{/* <KaLogin /> */}</div>
    </>
  );
}

export default withRouter(LoginPage);
