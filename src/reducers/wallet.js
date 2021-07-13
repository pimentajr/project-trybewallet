// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { GET_CURRENCIES_SUCCESS,
  GET_CURRENCIES_ERROR,
  GET_EXPENSE,
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
  default:
    return state;
  }
}

export default wallet;
