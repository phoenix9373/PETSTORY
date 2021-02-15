import { GET_FEED_DATA_WITH_HASHTAGS } from './types';
import { request } from '../utils/axios';

export function getFeedDataActionWithHashtags(offset, limit) {
  const data = request('GET', '/api/hashtag/findBoards', {}, { offset, limit });

  return {
    type: GET_FEED_DATA_WITH_HASHTAGS,
    payload: data,
  };
}
