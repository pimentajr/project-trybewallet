import { LOGIN } from '../actions/index';

const USER_INITIAL_STATE = {
  email: '',
};

function loginStore(state = USER_INITIAL_STATE, action) {
  switch (action.type) {
  case LOGIN:
    return { email: action.payload };
  default:
    return state;
  }
}

export default loginStore;
