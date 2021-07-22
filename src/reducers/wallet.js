// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { SUCCESS_FETCH, ADD_EXPENSE, DEL_EXPENSE } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

function fetchAPI(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SUCCESS_FETCH:
    return { ...state, currencies: action.coin };
  case ADD_EXPENSE:
    return { ...state, expenses: [...state.expenses, action.expense] };
  case DEL_EXPENSE:
    return { ...state, expenses: action.payload };
  default:
    return state;
  }
}

export default fetchAPI;
