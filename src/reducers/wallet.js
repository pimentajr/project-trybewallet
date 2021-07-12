// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
// Esse reducer será responsável por tratar as informações da pessoa usuária
import { SEND_DATA_EXPENSE, SET_WALLET, SEND_INFO_EXPENSE } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SET_WALLET:
    return { ...state, currencies: action.payload };
  case SEND_DATA_EXPENSE:
    return { ...state, expenses: action.payload };
  case SEND_INFO_EXPENSE:
    return { ...state, expenses: [...state.expenses, action.payload] };
  default:
    return state;
  }
}

export default wallet;
