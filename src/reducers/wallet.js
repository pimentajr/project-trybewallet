// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { REQUEST, SUCCESS } from '../actions';

const INITIAL_STATE = {
  isLoading: false,
  currencies: [],
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case REQUEST:
    return { ...state, isLoading: true };
  case SUCCESS:
    return { ...state, isLoading: false, currencies: action.payload };
  default:
    return state;
  }
}

export default wallet;
