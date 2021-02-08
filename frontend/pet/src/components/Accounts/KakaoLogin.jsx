import React, { PureComponent } from 'react';
import KaKaoLogins from 'react-kakao-login';
import axios from 'axios';

class KakaoLogin extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {};
  }
  responseKaKao = (response) => {
    this.setState({
      data: response,
    });
    console.log(response);

    axios(`/user/signin/kakao`, {
      // 백엔드에서 원하는 형태의 endpoint로 입력해서 fetch한다.
      method: 'GET',
      headers: {
        Authorization: response.response.access_token,
        // 받아오는 response객체의 access_token을 통해 유저 정보를 authorize한다.
      },
    })
      .then((res) => res.json())
      .then(
        (res) => localStorage.setItem('token', res.token),
        // 백엔드에서 요구하는 key 값(token)으로 저장해서 localStorage에 저장한다.
        // 여기서 중요한것은 처음에 console.log(res)해서 들어오는
        // access_token 값을 백엔드에 전달해줘서 백엔드에 저장 해두는
        // 절차가 있으므로 까먹지 말 것!
        // eslint-disable-next-line
        alert('로그인 성공하였습니다'),
      );
  };

  render() {
    return (
      <>
        <KaKaoLogins
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

export default KakaoLogin;
