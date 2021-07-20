import { ADD_EXPENSES, CURRENCIES, DLT_EXPENSE } from '../actions/index';

const initialState = {
  currencies: [],
  expenses: [],
};

function wallet(state = initialState, action) {
  switch (action.type) {
  case CURRENCIES:
    return { ...state,
      currencies: Object.keys(action.payload),
    };
  case ADD_EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };
  case DLT_EXPENSE:
    return {
      ...state,
      expenses: [...action.payload],
    };
  default:
    return state;
  }
}

export default wallet;
