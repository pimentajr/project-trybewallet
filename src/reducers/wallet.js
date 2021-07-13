import {
  REQUEST_API,
  REQUEST_API_SUCESS,
  REQUEST_API_ERROR,
} from '../actions/index';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  isLoading: false,
};

function wallet(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
  case REQUEST_API:
    return {
      ...state,
      isLoading: true,
    };
  case REQUEST_API_SUCESS:
    return {
      ...state,
      currencies: action.payload,
      isLoading: false,
    };
  case REQUEST_API_ERROR:
    return {
      ...state,
      isLoading: false,
    };
  default:
    return state;
  }
}

export default wallet;
