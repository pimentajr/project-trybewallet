import {
  REQUEST_CURRENCIES_SUCCESS,
  REQUEST_CURRENCIES_FAILED,
  SAVE_EXPENSES_SUCCESS,
  SAVE_EXPENSES_FAILED,

} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  countId: 0,
};

let arrayCurr;
let newCount = {};

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
  case SAVE_EXPENSES_SUCCESS:
    newCount = { ...action.payload, id: state.countId };
    return {
      ...state,
      expenses: [...state.expenses, newCount],
      countId: state.countId + 1,

    };
  case SAVE_EXPENSES_FAILED:
    return {
      error: action.payload,
    };
  default:
    return state;
  }
}

export default wallet;
