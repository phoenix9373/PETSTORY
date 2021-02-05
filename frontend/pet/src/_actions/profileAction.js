import {
  PROFILE_USER,
  MYSTORY_USER,
  FOLLOWERLIST,
  FOLLOWEELIST,
} from './types';
import { request } from '../utils/axios';

const USER_API_BASE_URL = '/profiles';
const BOARD_API_BASE_URL = '/board';
const RELATIONS_API_BASE_URL = '/relations';

export function addProfile(profileForm) {
  const data = request('POST', `${USER_API_BASE_URL}/new`, profileForm);
  return {
    type: PROFILE_USER,
    payload: data,
  };
}

export function modifyProfile(profileForm) {
  const profileId = localStorage.getItem('profile_id');
  const data = request(
    'PUT',
    `${USER_API_BASE_URL}/update/${profileId}`,
    profileForm,
  );
  return {
    type: PROFILE_USER,
    payload: data,
  };
}

export function ProfileList(memberId) {
  const data = request('GET', `${USER_API_BASE_URL}/findall/${memberId}`);
  return {
    type: PROFILE_USER,
    payload: data,
  };
}

export function ProfileId(memberId) {
  const data = request('GET', `${USER_API_BASE_URL}/findall/${memberId}`);
  return {
    type: PROFILE_USER,
    payload: data,
  };
}

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
