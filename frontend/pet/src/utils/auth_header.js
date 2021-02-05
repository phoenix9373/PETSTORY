// 인증 헤더는 로컬 저장소에서 현재 로그인 한 사용자의
// JWT (Json Web Token)가 포함 된 HTTP 인증 헤더를 반환하는
// 도우미 함수입니다. 사용자가 로그인하지 않은 경우 빈 개체가 반환됩니다.
// auth 헤더는 JWT 인증을 사용하여 서버 API에 대한 인증 된
// HTTP 요청을 만드는 데 사용됩니다.
export function authHeader() {
  const user = JSON.parse(localStorage.getItem('user'));

  if (user && user.authToken) {
    return { Authorization: `Bearer ${user.authToken}` };
  } else {
    return {};
  }
}
