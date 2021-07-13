// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import {
  ADD_EXPENSE,
  EDIT_EXPENSE,
  SAVE_EDITIONS,
  DELETE_EXPENSE,
  SET_CURRENCY,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  edit: false,
  idEdit: '',
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SET_CURRENCY:
    return {
      ...state,
      currencies: [...action.payload],
    };
  case ADD_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };
  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: [...action.payload],
    };
  case EDIT_EXPENSE:
    return {
      ...state,
      edit: true,
      idEdit: action.payload,
    };
  case SAVE_EDITIONS:
    return {
      ...state,
      expenses: [...action.payload],
      edit: false,
    };
  default:
    return state;
  }
}

export default wallet;
