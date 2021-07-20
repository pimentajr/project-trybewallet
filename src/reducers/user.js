// Esse reducer será responsável por tratar as informações da pessoa usuária
import { SET_USER_EMAIL } from '../actions';

const initialState = {
  email: '',
};

function user(state = initialState, { type, payload }) {
  switch (type) {
  case SET_USER_EMAIL:
    return { ...state, ...payload };
  default:
    return state;
  }
}

export default user;
