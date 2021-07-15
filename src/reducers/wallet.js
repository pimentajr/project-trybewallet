// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import {
  RECEIVED_DATA,
  ADD_EXPENSE, ADD_EXCHANGERATES, DELETE_EXPENSE, EDIT_EXPENSE, UPDATE_EXPENSE }
  from '../actions/index';

const WALLET_INITIAL_STATE = {
  rawData: {},
  currencies: [],
  expenses: [],
  expEdit: [],
  isOnEdition: false,
};

export default function wallet(state = WALLET_INITIAL_STATE, action) {
  switch (action.type) {
  case RECEIVED_DATA:
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
  case DELETE_EXPENSE:
    return {
      ...state, expenses: state.expenses.filter((ex, index) => index !== action.payload),
    };
  case EDIT_EXPENSE:
    return {
      ...state,
      expEdit: state.expenses.find((ex) => ex.id === action.payload),
      isOnEdition: true,
    };
  case UPDATE_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.map((ex) => {
        if (ex.id === state.expEdit.id) {
          return {
            id: ex.id,
            exchangeRates: ex.exchangeRates,
            ...action.payload,
          };
        }
        return ex;
      }),
      isOnEdition: false,
    };
  default:
    return state;
  }
}
