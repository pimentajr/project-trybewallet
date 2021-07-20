import { combineReducers } from 'redux';
import user from './user';
import wallet from './wallet';
import spending from './ spending';

export default combineReducers({
  user,
  wallet,
  spending,
});
