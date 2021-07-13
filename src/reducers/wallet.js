// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { GET_COINS, SPEND_INFO, DELETE_SPEND } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  rates: {},
};

export default function wallet(state = INITIAL_STATE, action) {
  if (action.type === GET_COINS) {
    return {
      ...state,
      currencies: Object.keys(action.payload),
      rates: action.payload,
    };
  }
  if (action.type === SPEND_INFO) {
    return {
      ...state,
      expenses: [...state.expenses, action.state],
    };
  }
  if (action.type === DELETE_SPEND) {
    return {
      ...state,
      expenses: state.expenses.filter((_, index) => index !== action.payload),
    };
  }
  return state;
}
