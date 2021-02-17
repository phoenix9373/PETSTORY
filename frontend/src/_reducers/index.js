import { combineReducers } from 'redux';
import user from './userReducer';
import alarmer from './alarmReducer';

const rootReducer = combineReducers({
  user,
  alarmer,
});

export default rootReducer;
