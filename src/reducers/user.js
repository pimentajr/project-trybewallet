import { ADDED_USER_EMAIL } from '../actions';

const DEFAULT_STATE = {
  email: '',
};

const userReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
  case ADDED_USER_EMAIL:
    return { ...state, email: action.email };
  default:
    return state;
  }
};

export default userReducer;
