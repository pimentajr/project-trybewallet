// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import {
  REQUEST_CURRENCIES,
  REQUEST_CURRENCIES_SUCCESS,
  REQUEST_CURRENCIES_FAILED,
} from '../actions';

const INITIAL_STATE = {
  error: '',
  currencies: [],
  isLoading: false,
};

function walletReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case REQUEST_CURRENCIES:
    return { ...state, isLoading: true };
  case REQUEST_CURRENCIES_SUCCESS:
    return { ...state, isLoading: false, currencies: action.payload };
  case REQUEST_CURRENCIES_FAILED:
    return { ...state, isLoading: false, error: action.payload };
  default:
    return state;
  }
}

export default walletReducer;
