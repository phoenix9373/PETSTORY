import {
  PROFILE_USER,
  MYSTORY_USER,
  FOLLOWERLIST,
  FOLLOWEELIST,
} from './types';
import { request } from '../utils/axios';

const USER_API_BASE_URL = '/profile';
const BOARD_API_BASE_URL = '/board';
const RELATIONS_API_BASE_URL = '/relations';

export function ProfileById(profileId) {
  const data = request('GET', `${USER_API_BASE_URL}/${profileId}`);
  return {
    type: PROFILE_USER,
    payload: data,
  };
}

export function MyStoryById(profileId) {
  const data = request('GET', `${BOARD_API_BASE_URL}/${profileId}`);
  return {
    type: MYSTORY_USER,
    payload: data,
  };
}

export function FollowerList(profileId) {
  const data = request('GET', `${RELATIONS_API_BASE_URL}/${profileId}`);
  return {
    type: FOLLOWERLIST,
    payload: data,
  };
}

export function FolloweeList(profileId) {
  const data = request('GET', `${RELATIONS_API_BASE_URL}/${profileId}`);
  return {
    type: FOLLOWEELIST,
    payload: data,
  };
}
