import {
  REQUEST_CURRENCIES_API,
  REQUEST_CURRENCIES_API_SUCCESS,
  REQUEST_CURRENCIES_API_ERROR,
  SET_EXCHANGE_RATES,
  SET_USER_DATA,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  exchangeRates: {},
  isFetching: false,
  totalExpenses: 0,
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case REQUEST_CURRENCIES_API:
    return {
      ...state,
      isFetching: true,
    };
  case REQUEST_CURRENCIES_API_SUCCESS:
    return {
      ...state,
      isFetching: false,
      currencies: [...Object.keys(action.payload)],
    };
  case SET_EXCHANGE_RATES:
    return {
      ...state,
      isFetching: false,
      exchangeRates: action.payload,
    };
  case SET_USER_DATA:
    return {
      ...state,
      isFetching: false,
      expenses: [...state.expenses, action.payload],
    };
  case REQUEST_CURRENCIES_API_ERROR:
    return {
      ...state,
      isFetching: false,
      exchangeRates: Error,
    };
  default:
    return state;
  }
}

export default wallet;
