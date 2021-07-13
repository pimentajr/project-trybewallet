// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import {
  REQUEST_COINS,
  REQUEST_COINS_ERROR,
  REQUEST_COINS_SUCCESS,
  SAVE_EXPENSES,
  DELETE_EXPENSES,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  isLoading: false,
};

function coinsReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case REQUEST_COINS:
    return {
      ...state,
      isLoading: true,
    };
  case REQUEST_COINS_SUCCESS:
    return {
      ...state,
      currencies: [...state.currencies, action.data], // poderia ser apenas [action.data]
      isLoading: false,
    };
  case REQUEST_COINS_ERROR:
    return {
      ...state,
      isLoading: false,
    };
  case SAVE_EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses, action.expenses],
      isLoading: false,
    };
  case DELETE_EXPENSES:
    return {
      ...state,
      expenses: state.expenses.filter((expense) => expense.id !== action.expenses),
      isLoading: false,
    };
  default:
    return state;
  }
}

export default coinsReducer;
