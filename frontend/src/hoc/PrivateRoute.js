// 반응 개인 경로 구성 요소는 사용자가 로그인 한 경우
// 경로 구성 요소를 렌더링하고, 그렇지 않으면 /login액세스하려는 반환
// URL이 있는 페이지로 사용자를 리디렉션합니다 .

// 사용자가 로그인되어 있는지 확인하는 방법은
// user로컬 저장소에 개체 가 있는지 확인하는 것입니다 .
// 브라우저 개발 도구를 사용하여 로컬 저장소에 개체를 수동으로
// 추가하여이 검사를 우회 할 수 있지만,
// 이는 클라이언트 측 구성 요소에 대한 액세스 권한 만 부여하고
// 유효한 인증으로 인해 서버 API의 실제 보안 데이터에 대한 액세스
// 권한을 부여하지 않습니다. 이를 위해서는 토큰 (JWT)이 필요합니다.

import React from 'react';
import { Route, Redirect } from 'react-router-dom';

function PrivateRoute({ component: Component, roles, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!localStorage.getItem('user')) {
          return (
            <Redirect
              to={{ pathname: '/login', state: { from: props.location } }}
            />
          );
        }
        return <Component {...props} />;
      }}
    />
  );
}

export { PrivateRoute };
