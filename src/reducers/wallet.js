// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import {
  REMOVE_EXPENSE,
  ADD_EXPENSE,
  REQUEST_CURRENCIES,
  FAILED_REQUEST,
} from '../actions';

const initialState = {
  currencies: [],
  expenses: [],
  isFetching: false,
  error: '',
};

function wallet(state = initialState, action) {
  switch (action.type) {
  case REMOVE_EXPENSE:
    return {
      ...state,
      isFetching: false,
      expenses: state.expenses.filter((expense) => expense !== action.expense),
    };

  case REQUEST_CURRENCIES:
    return {
      ...state,
      isFetching: true,
    };

  case ADD_EXPENSE:
    return {
      ...state,
      isFetching: false,
      expenses: [...state.expenses, { ...action.expense, exchangeRates: action.payload }],
    };

  case FAILED_REQUEST:
    return {
      ...state,
      isFetching: false,
      error: action.payload,
    };

  default:
    return state;
  }
}

export default wallet;
