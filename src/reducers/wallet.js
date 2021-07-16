// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { REQUEST_SUCCEED } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};
function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case REQUEST_SUCCEED:
    return { ...state, currencies: action.payload };
  default:
    return state;
  }
}

export default wallet;
