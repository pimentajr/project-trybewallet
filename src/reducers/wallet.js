// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { FETCH_ERROR, FETCH_STARTED, FETCH_SUCCESS } from '../actions';

const INITIAL_STATE = {
  loading: false,
  currencies: [],
  expenses: [],
  error: null,
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case FETCH_STARTED:
    return { ...state, loading: true };
  case FETCH_SUCCESS:
    return { ...state, currencies: action.payload, loading: false };
  case FETCH_ERROR:
    return { ...state, currencies: null, error: action.payload, loading: false };
  default:
    return state;
  }
}

export default wallet;
