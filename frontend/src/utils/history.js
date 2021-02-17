// 이 파일은 Router에서 사용하는 커스텀 히스토리 객체입니다.Router에서
// 예를 들어 로그인 하기 전 페이지에서 로그인을 눌러 성공후 반환해주는
// 위치를 설정하기 위해서 사용합니다.

import { createBrowserHistory } from 'history';

export const history = createBrowserHistory();
