import { SEND_CURRENCIES, SEND_EXPENSES, DEL_EXPENSE } from '../actions/index';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SEND_CURRENCIES:
    return {
      ...state, currencies: action.currencies,
    };
  case SEND_EXPENSES:
    return {
      ...state, expenses: [...state.expenses, action.expensesValues],
    };
  case DEL_EXPENSE:
    return {
      ...state, expenses: state.expenses.filter((expense) => expense.id !== action.id),
    };
  default: return state;
  }
}

export default wallet;
