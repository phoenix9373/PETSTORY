import { BOARD_FIND_ALL } from './types';
import { request } from '../utils/axios';

export function boardFindAll() {
  const data = request('GET', '/api/board/findAll');

  return {
    type: BOARD_FIND_ALL,
    payload: data,
  };
}
