import { EMAIL } from '../actions';

const INNITIAL_STATE = {
  email: '',
};

export default function user(state = INNITIAL_STATE, action) {
  switch (action.type) {
  case EMAIL:
    return {
      ...state,
      email: action.email,
    };
  default:
    return state;
  }
}
