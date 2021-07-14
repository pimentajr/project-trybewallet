// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

import { REQUEST_ISS_MOEDA, REQUEST_ISS_MOEDA_SUCCESS, REQUEST_ISS_MOEDA_ERROR, SAVEBUY }
  from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  error: null,
};

function walletReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case REQUEST_ISS_MOEDA:
    return {
      ...state,
    };
  case REQUEST_ISS_MOEDA_SUCCESS:
    return {
      ...state,
      currencies: Object.keys(action.currencies).filter((valor) => valor !== 'USDT'),
    };
  case REQUEST_ISS_MOEDA_ERROR:
    return {
      ...state,
      error: action.error,
    };
  case SAVEBUY:
    return {
      ...state,
      expenses: [...state.expenses, { ...action.payload, id: state.expenses.length }],
    };
  default:
    return state;
  }
}

export default walletReducer;
