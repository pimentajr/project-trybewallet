import {
  ACTION_CURRENCIES,
  ACTION_EXPENSES,
  ACTION_DELETING,
} from '../actions/index';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

function wallet(state = INITIAL_STATE, action) {
  const n = -2;
  switch (action.type) {
  case ACTION_CURRENCIES:
    return {
      ...state,
      currencies: parseFloat(action.payload),
    };
  case ACTION_EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses, { id: state.expenses.length, ...action.payload }],
    };
  case ACTION_DELETING:
    return {
      ...state,
      currencies: (
        Math.round(((parseFloat(state.currencies) - action.payload[1]) * 100), n) / 100
      ),
      expenses: state.expenses.filter((expense) => expense.id !== action.payload[0]),
    };
  default:
    return state;
  }
}

export default wallet;
