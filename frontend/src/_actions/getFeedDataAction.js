import { GET_FEED_DATA } from './types';
import { request } from '../utils/axios';

export function getFeedDataAction(offset, limit) {
  const data = request(
    'GET',
    '/api/board/findAllPaging',
    {},
    { offset, limit },
  );

  return {
    type: GET_FEED_DATA,
    payload: data,
  };
}
