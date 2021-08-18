import { EMAIL_ACTION } from '../actions';

const INITIAL_STATE = {
  email: '',
};

const updateEmail = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case EMAIL_ACTION:
    return {
      ...state,
      email: action.state,
    };
  default:
    return state;
  }
};

export default updateEmail;
