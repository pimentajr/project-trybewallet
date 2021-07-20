import {
  USER_NAME,
  USER_PASS,
} from '../actions';

const INITIAL_STATE = {
  email: '',
  password: '',
};

export default function user(state = INITIAL_STATE, action) {
  switch (action.type) {
  case USER_NAME:
    return { ...state, email: action.payload };
  case USER_PASS:
    return { ...state, password: action.payload };
  default:
    return state;
  }
}
