import {
  REQUEST_CURRENCY_API,
  REQUEST_CURRENCY_API_SUCESS,
  ADD_EXPENSES } from '../actions/index';

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
      currencies: action.payload,
      isLoading: false,
    };
  case ADD_EXPENSES:
    return ({
      ...state,
      id: state.id + 1,
      expenses: [...state.expenses,
        { id: action.id,
          ...action.payload,
          exchangesRates: state.currencies }],
    });
  default:
    return state;
  }
}

export default wallet;
