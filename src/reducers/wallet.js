// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { GET_CURRENCIES_SUCCESS,
  GET_CURRENCIES_ERROR,
  GET_EXPENSE,
  REMOVE_EXPENSE,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case GET_CURRENCIES_SUCCESS:
    return {
      ...state,
      currencies: action.payload.filter((curr) => (curr !== 'USDT')),
    };
  case GET_CURRENCIES_ERROR:
    return {
      ...state,
      error: action.payload,
    };
  case GET_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };
  case REMOVE_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses],
    };
  default:
    return state;
  }
}

export default wallet;

// TODO importei minha action removeExpense e criei um case para deletar os dados da store.
