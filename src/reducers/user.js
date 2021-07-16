import { SET_USEREMAIL } from '../actions';

const INITIAL_STATE = {
  email: 'teste@teste.com',
};

function user(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SET_USEREMAIL:
    return { ...state, email: action.payload };
  default:
    return state;
  }
}

export default user;
