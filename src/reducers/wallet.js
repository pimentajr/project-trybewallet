import {
  REQUEST_API,
  REQUEST_API_SUCESS,
  REQUEST_API_ERROR,
} from '../actions/index';
import { GET_STATE } from '../actions/getState';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  isFetching: false,
  id: 0,
};

function wallet(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
  case REQUEST_API:
    return {
      ...state,
      isFetching: true,
    };
  case REQUEST_API_SUCESS:
    return {
      ...state,
      isFetching: false,
      currencies: action.payload,
    };
  case REQUEST_API_ERROR:
    return {
      ...state,
      currencies: Error,
    };
  case GET_STATE:
    return ({
      ...state,
      id: state.id + 1,
      expenses: [...state.expenses,
        { id: action.id,
          ...action.payload,
          exchangeRates: state.currencies,
        }],
    });
  default:
    return state;
  }
}

export default wallet;
