// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import {
  REQUEST_CURRENCIES,
  REQUEST_CURRENCIES_SUCCESS,
  REQUEST_CURRENCIES_FAILED,
  ADD_EXPENSE,
} from '../actions';

const INITIAL_STATE = {
  error: '',
  currencies: [],
  isLoading: false,
  expenses: [],
};

function walletReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case REQUEST_CURRENCIES:
    return { ...state, isLoading: true };
  case REQUEST_CURRENCIES_SUCCESS: {
    const allCurrencies = Object.keys(action.payload);
    const filteredCurrencies = allCurrencies.filter((currency) => currency !== 'USDT');
    return {
      ...state,
      isLoading: false,
      currencies: [...state.currencies, ...filteredCurrencies],
    };
  }
  case REQUEST_CURRENCIES_FAILED:
    return { ...state, isLoading: false, error: action.payload,
    };
  case ADD_EXPENSE:
    return { ...state,
      expenses: [...state.expenses, action.payload],
    };
  default:
    return state;
  }
}

export default walletReducer;
