import { SAVE_EMAIL } from '../actions';

// Esse reducer será responsável por tratar as informações da pessoa usuária
const INITIAL_STATE = {
  email: '',
};

function user(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
  case SAVE_EMAIL:
    return {
      email: payload.email,
    };

  default:
    return state;
  }
}
export default user;
