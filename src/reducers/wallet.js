// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import {
  REQUEST_API,
  REQUEST_ERROR,
  REQUEST_SUCCESS,
  ADD_EXPENSES,
  DELETE_EXPENSES,
} from '../actions';

const INITIAL_STATE = {
  currencies: '',
  expenses: [],
  isLoading: true,
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case REQUEST_API:
    return { ...state, isLoading: true };
  case REQUEST_SUCCESS:
    return { ...state, isLoading: false, currencies: action.payload };
  case REQUEST_ERROR:
    return { ...state, isLoading: false };
  case ADD_EXPENSES:
    return { ...state,
      expenses: [...state.expenses, action.expenses],
    };
  case DELETE_EXPENSES:
    return { ...state,
      expenses: state.expenses.filter((expenses, index) => index !== action.idExpenses),
    };
  default:
    return state;
  }
}

export default wallet;
