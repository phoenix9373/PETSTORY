import { request } from '../utils/axios';
import { CREATE_BOARD } from './types';

export function createArticle(BoardForm) {
  const data = request('POST', '/api/board/create', BoardForm);
  return {
    type: CREATE_BOARD,
    payload: data,
  };
}
