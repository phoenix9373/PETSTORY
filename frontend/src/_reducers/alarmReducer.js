// action type 정의
const ALARM_NUM = 'ALARM_NUM';
// action 생성함수 정의
export const saveAlarmNum = (value) => ({
  type: ALARM_NUM,
  value,
});

const initalState = {
  alarmNum: null,
};

// reducer 함수
const alarmer = (state = initalState, action) => {
  switch (action.type) {
    case ALARM_NUM:
      return {
        ...state,
        alarmNum: action.value,
      };

    // default를 쓰지 않으면 맨처음 state에 count값이 undefined가 나옵니다 꼭! default문을 넣으세요
    default:
      return state;
  }
};

export default alarmer;
