import { USER_COIN_SUCESS, USER_COIN_ERROR } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  error: '',
};

export default function user(state = INITIAL_STATE, action) {
  switch (action.type) {
  case USER_COIN_SUCESS:
    return { ...state, currencies: Object.keys(action.payload) };
  case USER_COIN_ERROR:
    return { ...state, error: 'Vazio' };
  default:
    return state;
  }
}
