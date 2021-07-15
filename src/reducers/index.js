import { combineReducers } from 'redux';
import user from './user';
import wallet from './wallet';

const reducerRoot = combineReducers({
  user,
  wallet,
});

export default reducerRoot;

// Creation of combineReducers, for use of "user" and "wallet" reducers that deal with user and wallet information.
