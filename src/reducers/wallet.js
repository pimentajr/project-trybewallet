// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { ADD_EXPENSE } from '../actions';

const wallet = {
  currencies: [],
  expenses: [],
};

function walletReducer(state = wallet, action) {
  switch (action.type) {
  case ADD_EXPENSE:
    return { ...state, expenses: [...state.expenses, action.values] };
  default:
    return state;
  }
}

export default walletReducer;
