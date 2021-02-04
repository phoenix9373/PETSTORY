import axios from 'axios';

// const DOMAIN = 'http://localhost:8080';

axios.defaults.withCredentials = true; // 쿠키 데이터를 전송받기 위해
export const request = (method, url, data, params = {}) =>
  axios({
    method,
    url,
    params,
    headers: {
      'Access-Control-Allow-Credentials': true,
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    },
    data,
  })
    .then((res) => {
      console.log('@@@@@', res);
      return res.data;
    })
    .catch((err) => console.log(err));
