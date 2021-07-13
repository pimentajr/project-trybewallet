import {
  GET_CURRENCY,
  GET_CURRENCY_SUCCESS,
  GET_CURRENCY_FAILED,
  ADD_EXPENSE,
} from '../actions';

const INITIAL_STATE = {
  currencies: {},
  expenses: [],
};

function walletReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case GET_CURRENCY:
    return {
      ...state,
    };
  case GET_CURRENCY_SUCCESS:
    return {
      ...state,
      currencies: action.payload,
    };
  case GET_CURRENCY_FAILED:
    return {
      ...state,
      error: action.payload,
    };
  case ADD_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, ...action.payload],
    };
  default:
    return state;
  }
}

export default walletReducer;
