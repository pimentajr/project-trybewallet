import { RECEIVE_MOEDAS, REQUEST_MOEDAS, FAILED_REQUEST, ADD_EXPENSE } from '../actions';

const INITIAL_STATE = {
  moedas: [],
  expenses: [],
};

function wallet(state = INITIAL_STATE, action) {
  // const { expenses } = state;
  // const expenseId = expenses.length > 0 ? expenses[expenses.length - 1].id + 1 : 0;
  // console.log(expenseId)
  switch (action.type) {
  case REQUEST_MOEDAS:
    return { ...state };
  case RECEIVE_MOEDAS:
    return { ...state, moedas: [...state.moedas, action.moedas] };
  case FAILED_REQUEST:
    return { ...state, error: action.error };
  case ADD_EXPENSE:
    return { ...state, expenses: [...state.expenses, action.expenses] };
  default:
    return state;
  }
}

export default wallet;
