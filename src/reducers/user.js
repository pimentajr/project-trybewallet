// Esse reducer será responsável por tratar as informações da pessoa usuária
import { SET_USER_EMAIL } from '../actions';

const initialState = {
  email: '',
};

function user(state = initialState, action) {
  switch (action.type) {
  case SET_USER_EMAIL:
    return { ...state,
      email: action.email,
    };
  default:
    return state;
  }
}

export default user;
