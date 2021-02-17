import { GET_FEED_DATA } from './types';
import { request } from '../utils/axios';

export function getFeedDataAction(offset, limit, profileId) {
  const data = request(
    'GET',
    `/api/board/findAllPaging/${profileId}`,
    {},
    { offset, limit },
  );

  return {
    type: GET_FEED_DATA,
    payload: data,
  };
}
