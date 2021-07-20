import {
  REQUEST_CURRENCIES,
  REQUEST_CURRENCIES_SUCCESS,
  REQUEST_CURRENCIES_ERROR,
  REQUEST_EXPENSES_SUCCESS,
  EXPENSES_DELETE,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  error: null,
  isLoading: false,
  total: 0,
};

const Wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_CURRENCIES:
    return {
      ...state,
      isLoading: true,
    };
  case REQUEST_CURRENCIES_SUCCESS: {
    const currencies = Object.keys(action.payload);
    const filterCurrencies = currencies.filter((currencie) => currencie !== 'USDT');
    return {
      ...state,
      currencies: filterCurrencies,
      isLoading: false,
    };
  }
  case REQUEST_CURRENCIES_ERROR:
    return {
      ...state,
      error: action.payload,
      isLoading: false,
    };
  case REQUEST_EXPENSES_SUCCESS:
    return {
      ...state,
      expenses: [
        ...state.expenses, { ...action.stateForm, exchangeRates: action.data }],
      total: Number(state.total) + Number(action.value),
      isLoading: false,
    };
  case EXPENSES_DELETE:
    return {
      ...state,
      expenses: action.expenses,
      total: action.total,
      isLoading: false,
    };
  default:
    return state;
  }
};

export default Wallet;
