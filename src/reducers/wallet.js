import {
  REQUEST_CURRENCY_API,
  REQUEST_CURRENCY_API_SUCESS,
  ADD_EXPENSES,
  REMOVE_EXPENSE } from '../actions/index';

const INITIAL_STATE = {
  currencies: [],
  id: 0,
  expenses: [],
  isLoading: false,
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case REQUEST_CURRENCY_API:
    return {
      ...state,
      isLoading: true,
    };
  case REQUEST_CURRENCY_API_SUCESS:
    return {
      ...state,
      isLoading: false,
      currencies: action.payload,
    };
  case ADD_EXPENSES:
    return {
      ...state,
      id: state.id + 1,
      expenses: [...state.expenses,
        { id: action.id,
          ...action.expenses,
          exchangeRates: state.currencies,
        }],
    };
  case REMOVE_EXPENSE:
    return ({
      ...state,
      expenses: [...state.expenses.filter((item) => item.id !== action.id)],
    });
  default:
    return state;
  }
}

export default wallet;
