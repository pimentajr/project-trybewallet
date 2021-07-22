import { ADD_CURRENCIES, ADD_EXPENSES, REMOVE_EXPENSE } from '../actions';

const WALLET_INITIAL_STATE = {

  currencies: [],
  expenses: [],

};

const wallet = (state = WALLET_INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_CURRENCIES:
    return { ...state, currencies: action.payload.currencies };
  case ADD_EXPENSES:
    return { ...state, expenses: [...state.expenses, action.payload] };
  case REMOVE_EXPENSE:
    return { ...state,
      expenses: state.expenses.filter((expense) => expense.id !== action.payload) };
  default:
    return { ...state };
  }
};

export default wallet;
