import {
  LOGIN_ENTER_CLICK_ACTION,
} from '../actions';

const INITIAL_STATE = {
  email: '',
  password: '',
};

function user(state = INITIAL_STATE, action) {
  switch (action.type) {
  case LOGIN_ENTER_CLICK_ACTION:
    return {
      ...state,
      email: action.payload,
    };

  default:
    return state;
  }
}

export default user;
