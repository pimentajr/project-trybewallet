// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import {
  RECEIVE_CURRENCIES,
  REQUEST_CURRENCIES,
  ADD_EXPENSE,
  REM_EXPENSE,
  EDITOR_ON,
  EDITOR_OFF,
  EDIT_DONE,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  load: true,
  editing: false,
  editID: '',
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_CURRENCIES:
    return { ...state, load: false };
  case RECEIVE_CURRENCIES:
    return { ...state, currencies: action.currencies };
  case ADD_EXPENSE:
    return { ...state, expenses: [...state.expenses, action.expenses] };
  case REM_EXPENSE:
    return { ...state,
      expenses: state.expenses.filter((expense) => expense.id !== action.id),
      editing: false };
  case EDITOR_ON:
    return { ...state,
      editing: true,
      editID: state.expenses.filter(({ id }) => id === action.editID) };
  case EDITOR_OFF:
    return { ...state, editing: false, editID: '' };
  case EDIT_DONE:
    return { ...state,
      editing: false,
      expenses: [...state.expenses.reduce((acc, curr) => (curr.id === action.modified.id
        ? acc.concat(action.modified) : acc.concat(curr)), [])] };
  default:
    return state;
  }
};

export default wallet;
