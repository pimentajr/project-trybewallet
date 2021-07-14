import {
  REQUEST_CURRENCIES,
  RECEIVED_CURRENCIES,
  ADD_EXPENSE,
  REMOVE_EXPENSE,
  EDIT_EXPENSE,
} from '../actions';

const INITIAL_STATE = {
  isLoading: false,
  currencies: {},
  expenses: [],
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_CURRENCIES:
    return { ...state, isLoading: true };
  case RECEIVED_CURRENCIES:
    return { ...state, isLoading: false, currencies: action.payload };
  case ADD_EXPENSE:
    return { ...state, expenses: [...state.expenses, action.payload] };
  case REMOVE_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.filter((expense) => expense.id !== action.payload),
    };
  case EDIT_EXPENSE:
  return {
    ...state,
    expenses: state.expenses.filter((expense) => expense.id !== action.payload),
  };
  default:
    return state;
  }
};

export default wallet;
