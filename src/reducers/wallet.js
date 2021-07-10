// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import {
  REQUEST_API,
  REQUEST_ERROR,
  REQUEST_SUCCESS,
} from '../actions';

const INITIAL_STATE = {
  wallet: {
    currencies: [],
    expenses: [],
    isLoading: true,
  },
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case REQUEST_API:
    return { ...state, isLoading: true };
  case REQUEST_SUCCESS:
    return { ...state, isLoading: false, payload: action.payload };
  case REQUEST_ERROR:
    return { ...state, isLoading: false };
  default:
    return state;
  }
}

export default wallet;
