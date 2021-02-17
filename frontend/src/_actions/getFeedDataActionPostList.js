import { GET_FEED_DATA } from './types';
import { request } from '../utils/axios';

export function getFeedDataActionPostList(
  offset,
  limit,
  profileId,
  memberPostlistId,
) {
  const data = request(
    'GET',
    `/api/postlist/findAllPaging/${memberPostlistId}`,
    {},
    { offset, limit, profile_id: profileId },
  );

  return {
    type: GET_FEED_DATA,
    payload: data,
  };
}
