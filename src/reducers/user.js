import { EMAIL_TO_STATE } from '../actions/index';

const INITIAL_STATE = {
  email: '',
};

// requisito 03
function user(state = INITIAL_STATE, action) {
  switch (action.type) {
  case EMAIL_TO_STATE:
    return {
      ...state, email: action.email,
    };
  default: return state;
  }
}

export default user;
