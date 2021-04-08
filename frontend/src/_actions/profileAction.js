import {
  PROFILE_USER,
  MYSTORY_USER,
  FOLLOWERLIST,
  FOLLOWEELIST,
} from './types';

import { request } from '../utils/axios';

const USER_API_BASE_URL = '/api/profiles';
const BOARD_API_BASE_URL = '/api/board';
const RELATIONS_API_BASE_URL = '/api/relations';
const PROFILE_API_BASE_URL = '/api/profile';

// 프로필 생성
export function addProfile(profileForm) {
  const data = request('POST', `${USER_API_BASE_URL}/new`, profileForm);
  return {
    type: PROFILE_USER,
    payload: data,
  };
}

// 프로필 상세보기 조회
export function getProfileList(profileId) {
  const data = request('GET', `/api/detail/profile/${profileId}`, profileId);
  return {
    type: PROFILE_USER,
    payload: data,
  };
}
// 프로필 수정
export function modifyProfile(profileForm) {
  const profileId = localStorage.getItem('profileId');
  const data = request(
    'PUT',
    `${PROFILE_API_BASE_URL}/update/${profileId}`,
    profileForm,
  );
  return {
    type: PROFILE_USER,
    payload: data,
  };
}
// 멀티 프로필 조회
export function ProfileList(memberId) {
  const data = request('GET', `/api/${USER_API_BASE_URL}/findall/${memberId}`);
  return {
    type: PROFILE_USER,
    payload: data,
  };
}
// 프로필 삭제
export function deleteProfile(profileId) {
  const data = request('DELETE', `${PROFILE_API_BASE_URL}/delete/${profileId}`);
  return {
    type: PROFILE_USER,
    payload: data,
  };
}
// 팔로우 신청
export function createFollow(idInfo) {
  const data = request('POST', `${PROFILE_API_BASE_URL}/follow`, idInfo);
  return {
    type: PROFILE_USER,
    payload: data,
  };
}
// 좋아요 한 게시물 조회
export function getLikeBoard(profileId) {
  const data = request(
    'GET',
    `/api/board/findLike/${profileId}?offset=0&limit=3`,
    profileId,
  );
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

// 팔로워 목록 (나를 팔로우 하는 사람 목록)
export function getFollowerList(profileId) {
  const data = request('GET', `/api/pollow/followee/${profileId}`);
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

// 알람수 요청
export function getAlarmNumdddd(profileId) {
  const data = request('GET', `/api/main/${profileId}`);
  return {
    type: 'ALARM_NUM',
    payload: data,
  };
}
