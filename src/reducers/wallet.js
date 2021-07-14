// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import {
  GET_CURRENCIES, REQUEST_CURRENCIES,
  FAILED_REQUEST, SET_EXPENSE, REMOVE_EXPENSE, EDIT_EXPENSE, SET_EDITED_EXPENSE,
} from '../actions';

const GLOBAL_WALLET_STATE = {
  currencies: [],
  expenses: [],
  isFetching: false,
  editing: false,
  editExpense: false,
};

const wallet = (state = GLOBAL_WALLET_STATE, action) => {
  switch (action.type) {
  case REQUEST_CURRENCIES:
    return { ...state, isFetching: true };
  case GET_CURRENCIES:
    return { ...state, currencies: action.currencies, isFetching: false };
  case FAILED_REQUEST:
    return { error: action.currencies, isFetching: false };
  case SET_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, action.expense],
    };
  case REMOVE_EXPENSE:
    return {
      ...state,
      expenses: [
        ...state.expenses.slice(0, state.expenses.indexOf(action.expense)),
        ...state.expenses.slice(state.expenses.indexOf(action.expense) + 1),
      ],
    };
  case EDIT_EXPENSE:
    return {
      ...state,
      editing: action.editing,
      editExpense: action.editExpense,
    };
  case SET_EDITED_EXPENSE: {
    return {
      ...state,
      expenses: [
        ...state.expenses.slice(0, state.expenses.indexOf(action.expense)),
        action.editedExpense,
        ...state.expenses.slice(state.expenses.indexOf(action.expense) + 1),
      ],
      editing: action.editing,
    };
  }
  default:
    return {
      ...state,
    };
  }
};

export default wallet;
