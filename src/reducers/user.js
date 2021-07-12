import { SET_USER } from '../actions';

const initialState = {
  email: '',
};

const user = (state = initialState, { type, payload }) => {
  switch (type) {
  case SET_USER:
    return {
      ...state,
      email: payload.user.email,
    };

  default:
    return state;
  }
};

export default user;
