import {
  USER_COIN_SUCESS,
  ADD_USER_SPENDING,
} from '../actions';

const INITIAL_STATE = {
  expenses: [],
};

export default function user(state = INITIAL_STATE, action) {
  switch (action.type) {
  case ADD_USER_SPENDING:
    return { ...state, expenses: [...state.expenses, action.payload] };
  case USER_COIN_SUCESS:
    return { ...state, exchangeRates: action.payload };
  default:
    return state;
  }
}
