// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

import {
  REQUEST_CURRENCIES,
  REQUEST_SUCCESS,
  REQUEST_ADD_EXPENSES,
} from '../actions/wallet';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  // isLoading: false,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_CURRENCIES:
    return {
      ...state,
      // isLoading: true,
    };
  case REQUEST_SUCCESS:
    return {
      ...state,
      currencies: action.currencies,
      // isLoading: false,
    };

  case REQUEST_ADD_EXPENSES: {
    const newExpense = {
      id: state.expenses.length,
      value: action.state.value,
      description: action.state.description,
      currency: action.state.currency,
      method: action.state.method,
      tag: action.state.tag,
      exchangeRates: action.updateCurrencies.currencies,
    };
    return {
      ...state,
      expenses: [...state.expenses, newExpense],
    };
  }

  default:
    return state;
  }
};

export default wallet;
