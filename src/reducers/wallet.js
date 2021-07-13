import {
  REQUEST_CURRENCIES_SUCCESS,
  REQUEST_CURRENCIES_FAILED,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};
let arrayCurr;

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case REQUEST_CURRENCIES_SUCCESS:
    arrayCurr = Object.keys(action.payload);
    return {
      ...state,
      currencies: [...arrayCurr.filter((item) => (item !== 'USDT'))],
    };
  case REQUEST_CURRENCIES_FAILED:
    return {
      ...state,
      error: action.payload,
    };
  default:
    return state;
  }
}

export default wallet;
