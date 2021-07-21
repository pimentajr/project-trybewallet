import {
  REQUEST_CURRENCIES,
  REQUEST_CURRENCIES_SUCESS,
  REQUEST_CURRENCIES_ERROR,
  SAVE_EXPENSES,
} from '../actions/walletActions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case REQUEST_CURRENCIES:
    return {
      ...state,
    };
  case REQUEST_CURRENCIES_SUCESS:
    return {
      ...state,
      currencies: action.payload,
    };
  case REQUEST_CURRENCIES_ERROR:
    return {
      ...state,
      erro: action.error,
    };
  case SAVE_EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };
  default:
    return state;
  }
}

export default wallet;
