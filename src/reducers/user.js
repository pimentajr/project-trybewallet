import { SET_EMAIL } from '../actions';

const INITIAL_STATE = {
  email: 'alguem@alguem.com',
};

function user(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
  case SET_EMAIL:
    return {
      email: payload,
    };
  default:
    return state;
  }
}

export default user;
