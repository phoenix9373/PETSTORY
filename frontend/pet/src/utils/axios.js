import axios from 'axios';

const DOMAIN = 'http://localhost:8080';

axios.defaults.withCredentials = true; // 쿠키 데이터를 전송받기 위해
export const request = (method, url, data) =>
  axios({
    method,
    url: DOMAIN + url,
    data,
  })
    .then((res) => {
      console.log(res);
      return res.data;
    })
    .catch((err) => console.log(err));

export const kakao = (method, url, data) =>
  axios({
    method,
    url: DOMAIN + url,
    data,
  })
    .then((res) => {
      console.log(res);
      return res.data;
    })
    .catch((err) => console.log(err));
