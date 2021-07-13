// import { REQ_CURRENCIES_GOOD } from '../actions/index';
import { REQ_CURRENCIES_GOOD_FORM } from '../actions/index';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  total: 0,
};

function walletReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  //   case REQ_CURRENCIES_GOOD:
  //     return state;
  //     // return { ...state, expenses: [...expenses, payload], total: total + payload.valor };
  case REQ_CURRENCIES_GOOD_FORM:
    return { ...state, currencies: [...action.payload] };
  default:
    return state;
  }
  // return state; // provisorio
}
export default walletReducer;
