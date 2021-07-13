import {
  REQUEST_API,
  REQUEST_API_SUCESS,
  REQUEST_API_ERROR,
} from '../actions/index';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

function wallet(state = INITIAL_STATE, action = {}) {
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
  default:
    return state;
  }
}

export default wallet;
