import { CHANGE_EMAIL } from '../actions/index';

const INITIAL_STATE = {
  email: '',
};

function user(state = INITIAL_STATE, action) {
  switch (action.type) {
  case CHANGE_EMAIL:
    return {
      ...state, email: action.payload,
    };
  default: return state;
  }
}

export default user;
