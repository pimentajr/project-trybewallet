import {
  SET_EXPENSE,
  GET_CURRENCIES,
  GET_CURRENCIES_SUCCESS,
  GET_CURRENCIES_FAIL,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SET_EXPENSE:
    return { ...state, expenses: [...state.expenses, action.state] };
  case GET_CURRENCIES:
    return { ...state };
  case GET_CURRENCIES_SUCCESS:
    return { ...state, currencies: action.state };
  case GET_CURRENCIES_FAIL:
    return { ...state, error: action.state };
  default:
    return state;
  }
}

export default wallet;
