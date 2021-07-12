// Esse reducer será responsável por tratar as informações da pessoa usuária
import { SEND_LOGIN } from '../actions';

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
