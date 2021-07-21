import { combineReducers } from 'redux';
import user from './user.js';
import wallet from './wallet.js';

const rootReducer = combineReducers({
  user,
  wallet,
});

export default rootReducer;
