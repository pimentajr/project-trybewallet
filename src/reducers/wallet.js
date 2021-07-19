// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

import {
  CURRENCIES_VALUES,
  DELETA_DESPESA,
  EXPENSES_VALUES,
  REQUEST_CURRENCIES,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  isFetching: false,
};

// Correção da lógica do EXPENSES_VALUES feita com a ajuda
// do Jonathan Souza - Turma 10 - Tribo B.

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case CURRENCIES_VALUES:
    return {
      ...state,
      currencies: action.payload,
      isFetching: false,
    };
  case EXPENSES_VALUES:
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };
  case REQUEST_CURRENCIES:
    return {
      ...state,
      isFetching: true,
    };
  case DELETA_DESPESA:
    return {
      ...state,
      expenses: state.expenses.filter(({ id }) => id !== action.payload),
    };
  default:
    return state;
  }
}

export default wallet;
