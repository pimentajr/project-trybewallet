import { REQUEST_CURRENCIES,
  REQUEST_CURRENCIES_SUCCESS,
  REQUEST_CURRENCIES_ERROR } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  erro: null,
};

function wallet(state = INITIAL_STATE, { type, payload }) {
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
  default:
    return state;
  }
}

export default wallet;
