// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import {
  SEND_RESPONSE_FROM_API_TO_STORE,
  API_ERROR,
  ADD_SPENT,
} from '../actions';

const INITIAL_STATE = {
  editForm: false,
  currency: 'BRL',
  currencies: [],
  error: '',
  expenses: [],
  editableObject: null,
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SEND_RESPONSE_FROM_API_TO_STORE:
    return {
      ...state,
      currencies: action.payload.map((item) => item.code),
    };
  case API_ERROR:
    return {
      ...state,
      error: action.payload,
    };
  case ADD_SPENT:
    return ({
      ...state,
      currencies: action.currencies,
      expenses: action.expenses,
    });
  case 'DELETE_EXPENSE':
    return ({
      ...state,
      expenses: state.expenses.filter(
        (expense) => action.id !== expense.id,
      ),
    });
  case 'SAVE_EXPENSES':
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };
  default:
    return state;
  }
}

export default wallet;
