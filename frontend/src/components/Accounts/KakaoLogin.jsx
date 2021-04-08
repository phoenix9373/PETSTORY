import React, { Component } from 'react';
import KaKaoLogins from 'react-kakao-login';
import axios from 'axios';
import styled from 'styled-components';
import toast from 'react-hot-toast';

const KaKaoBtn = styled(KaKaoLogins)`
  padding: 0;
  width: 190px;
  height: 44px;
  line-height: 44px;
  color: #783c00;
  background-color: #ffeb00;
  border: 1px solid transparent;
  border-radius: 30px !important;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  cursor: pointer;
  &:hover {
    box-shadow: 0 0px 15px 0 rgba(0, 0, 0, 0.2);
  }
`;
export default class KakaoLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  responseKaKao = (response) => {
    this.setState({
      data: response,
    });
    const body = {
      email: response.profile.kakao_account.email,
      member_name: response.profile.kakao_account.profile.nickname,
    };

    axios(`/api/kakaologin`, {
      // 백엔드에서 원하는 형태의 endpoint로 입력해서 fetch한다.
      method: 'POST',
      headers: {
        Authorization: response.response.access_token,
        // 받아오는 response객체의 access_token을 통해 유저 정보를 authorize한다.
      },
      data: body,
    })
      .then(
        (res) => {
          localStorage.clear();
          localStorage.setItem('user', JSON.stringify(res.data));
          window.location.href = '/select';
        },
        // 백엔드에서 요구하는 key 값(token)으로 저장해서 localStorage에 저장한다.
        // 여기서 중요한것은 처음에 console.log(res)해서 들어오는
        // access_token 값을 백엔드에 전달해줘서 백엔드에 저장 해두는
        // 절차가 있으므로 까먹지 말 것!
        // (window.location.href = 'http://localhost:3000/select'),
      )
      .catch((err) => {
        toast.error('로그인에 실패하였습니다.');
      });
  };

  render() {
    return (
      <>
        <KaKaoBtn
          // styled component 통해 style을 입혀 줄 예정
          jsKey={'bd060977289177fd1c71aad8efeb5318'}
          // 카카오에서 할당받은 jsKey를 입력
          buttonText="카카오 계정으로 로그인"
          // 로그인 버튼의 text를 입력
          onSuccess={this.responseKaKao}
          // 성공했을때 불러올 함수로서 fetch해서 localStorage에 저장할 함수를 여기로 저장
          getProfile={true}
        />
      </>
    );
  }
}
