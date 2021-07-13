// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import {
  REQUEST_CURRENCIES_API,
  REQUEST_CURRENCIES_API_SUCCESS,
}
  from '../actions/walletActionsAPI';
import { SEND_EXPENSES } from '../actions/walletActions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case REQUEST_CURRENCIES_API:
    return {
      ...state,
    };
  case REQUEST_CURRENCIES_API_SUCCESS:
    return {
      ...state,
      currencies: [...state.currencies,
        ...action.payload.filter((data1) => data1 !== 'USDT')],
    };
  case SEND_EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };
  default:
    return { ...state };
  }
}
export default wallet;
