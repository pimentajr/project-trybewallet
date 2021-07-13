import {
  REQUEST_CURRENCIES,
  REQUEST_CURRENCIES_SUCCESS,
  REQUEST_CURRENCIES_ERROR,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  error: null,
};

const Wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_CURRENCIES:
    return {
      ...state,
    };
  case REQUEST_CURRENCIES_SUCCESS: {
    const currencies = Object.keys(action.payload);
    const filterCurrencies = currencies.filter((currencie) => currencie !== 'USDT');
    return {
      ...state,
      currencies: filterCurrencies,
    };
  }
  case REQUEST_CURRENCIES_ERROR:
    return {
      ...state,
      error: action.payload,
    };
  default:
    return state;
  }
};

export default Wallet;
