import {
  REQUEST_API,
  REQUEST_API_SUCESS,
  REQUEST_API_ERROR,
} from '../actions/index';
import { GET_STATE } from '../actions/getState';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  buttonIsClick: false,
};

function wallet(state = INITIAL_STATE, action = {}) {
  const NUMBER = 5;
  switch (action.type) {
  case REQUEST_API:
    return {
      ...state,
    };
  case REQUEST_API_SUCESS:
    return {
      ...state,
      currencies: action.payload,
    };
  case REQUEST_API_ERROR:
    return {
      ...state,
      currencies: Error,
    };
  case GET_STATE:
    return {
      ...state,
      buttonIsClick: action.button,
      ...state.expenses.splice(action.test, NUMBER, action.payload),
    };
  default:
    return state;
  }
}

export default wallet;
