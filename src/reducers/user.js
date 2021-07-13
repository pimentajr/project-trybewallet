import { SEND_LOGIN } from '../actions/index';

const INITIAL_STATE = {
  email: '',
};

function userReducer(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
  case SEND_LOGIN:
    return { ...state, email: payload };
  default:
    return state;
  }
}
export default userReducer;
