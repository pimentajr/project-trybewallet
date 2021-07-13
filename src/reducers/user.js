import { USER_LOGIN } from '../actions';

const INICIAL_STATE = {
  email: '',
};

const user = (state = INICIAL_STATE, action) => {
  switch (action.type) {
  case USER_LOGIN:
    return {
      ...state,
      email: action.payload,
    };
  default: return state;
  }
};
export default user;
