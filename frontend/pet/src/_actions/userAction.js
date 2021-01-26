import { REGISTER_USER, LOGIN_USER, LOGOUT_USER, AUTH_USER } from './types';
import { request } from '../utils/axios';

const USER_URL = '/api/user';

export function registerUser(dataToSubmit) {
  const data = request('post', `${USER_URL}/register`, dataToSubmit);

  return {
    type: REGISTER_USER,
    payload: data,
  };
}

export function loginUser(dataToSubmit) {
  const data = request('post', `${USER_URL}/login`, dataToSubmit);

  return {
    type: LOGIN_USER,
    payload: data,
  };
}

export function logoutUser() {
  const data = request('post', `${USER_URL}/logout`);

  return {
    type: LOGOUT_USER,
    payload: data,
  };
}

export function authUser() {
  const data = request('post', `${USER_URL}/auth`);

  return {
    type: AUTH_USER,
    payload: data,
  };
}
