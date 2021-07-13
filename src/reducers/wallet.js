import { FETCH_CURRENCIES, SUBMIT_EXPENSES } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

const wallet = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case FETCH_CURRENCIES:
    return {
      ...state,
      currencies: payload,
    };
  case SUBMIT_EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses, payload],
    };
  default:
    return state;
  }
};

export default wallet;
