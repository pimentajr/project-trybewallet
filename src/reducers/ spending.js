import {
  USER_COIN_SUCESS,
  ADD_USER_SPENDING,
} from '../actions';

const INITIAL_STATE = {
  spending: [],
};

export default function user(state = INITIAL_STATE, action) {
  switch (action.type) {
  case ADD_USER_SPENDING:
    return { ...state, spending: [...state.spending, action.payload] };
  case USER_COIN_SUCESS:
    return { ...state, exchangeRates: action.payload };
  default:
    return state;
  }
}
