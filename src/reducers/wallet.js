// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { REQUEST, SUCCESS, EXPENSES } from '../actions';

const INITIAL_STATE = {
  isLoading: false,
  currencies: [],
  expenses: [],
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case REQUEST:
    return { ...state, isLoading: true };
  case SUCCESS:
    return { ...state, isLoading: false, currencies: action.payload };
  case EXPENSES:
    return { ...state, expenses: [...state.expenses, action.expenses] };
/*     return { ...state, expenses: [...state.expenses, action.expenses], exchangeRates: action.result }; */
  default:
    return state;
  }
}

export default wallet;
