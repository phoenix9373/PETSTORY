import { GET_FEED_DATA } from '../_actions/types';

export default function (state = {}, action) {
  switch (action.type) {
    case GET_FEED_DATA:
      return { ...state, data: action.payload.data };
    default:
      return state;
  }
}
