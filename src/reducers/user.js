import { GET_LOGIN } from '../actions';

const INITIAL_STATE = {
  user: {
    email: '',
  },
};

function user(state = INITIAL_STATE, action) {
  const { type, email } = action;
  switch (type) {
  case GET_LOGIN:
    return {
      ...state, email,
    };
  default:
    return state;
  }
}

export default user;
