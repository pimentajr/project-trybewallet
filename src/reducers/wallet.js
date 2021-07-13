// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { RECEIVED_DATA, ADD_EXPENSE, ADD_EXCHANGERATES } from '../actions/index';

const WALLET_INITIAL_STATE = {
  rawData: {},
  currencies: [],
  expenses: [],
};

export default function wallet(state = WALLET_INITIAL_STATE, action) {
  switch (action.type) {
  case RECEIVED_DATA:
    console.log(action.currencies);
    return {
      // rawData
      ...state,
      currencies: Object.keys(action.currencies).filter((c) => c !== 'USDT'),
    };
  case ADD_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };
  case ADD_EXCHANGERATES:
    return {
      ...state, rawData: action.payload,
    };
  default:
    return state;
  }
}
