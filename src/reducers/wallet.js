// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

import {
  REQUEST_CURRENCIES,
  REQUEST_SUCCESS,
} from '../actions/wallet';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  isLoading: false,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_CURRENCIES:
    return {
      ...state,
      isLoading: true,
    };
  case REQUEST_SUCCESS:
    return {
      ...state,
      currencies: action.currencies.filter((currency) => currency.codein !== 'BRLT'),
      isLoading: false,
    };
  default:
    return state;
  }
};

export default wallet;
