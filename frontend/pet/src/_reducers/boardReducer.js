import { BOARD_FIND_ALL } from '../_actions/types';

export default function (state = {}, action) {
  switch (action.type) {
    case BOARD_FIND_ALL:
      return { ...state, data: action.payload.data };
    default:
      return state;
  }
}
