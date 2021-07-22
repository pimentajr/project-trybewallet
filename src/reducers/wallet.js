import { REQUEST_CURRENCIES,
  REQUEST_CURRENCIES_SUCCESS,
  REQUEST_CURRENCIES_ERROR,
  REQUEST_NEW_CURRENCIES,
  DELETE_EXPENSE } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  erro: null,
};

function wallet(state = INITIAL_STATE, action) {
  const { type, payload, newCoins } = action;
  switch (type) {
  case REQUEST_CURRENCIES:
    return {
      ...state,
    };
  case REQUEST_CURRENCIES_SUCCESS:
    return {
      ...state,
      currencies: Object.keys(payload).filter((coin) => coin !== 'USDT'),
    };
  case REQUEST_CURRENCIES_ERROR:
    return {
      ...state,
      erro: payload.error,
    };
  case REQUEST_NEW_CURRENCIES:
    payload.exchangeRates = newCoins;
    return {
      ...state,
      expenses: [...state.expenses, payload],
    };
  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses.filter(({ id }) => id !== action.id)],
    };
  default:
    return state;
  }
}

export default wallet;
