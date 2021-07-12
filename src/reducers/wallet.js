import { ADD_CURRENCIES, ADD_EXPENSE, REMOVE_EXPENSE, UPDATE_EXPENSE } from '../actions';

const INITIAL_STATE = {
  expenses: [],
  currencies: [],
};

const updatedExpenses = (expenses, updatedExpense) => expenses
  .map((expense) => (expense.id !== updatedExpense.id ? expense : updatedExpense));

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_EXPENSE: {
    const { expenses } = state;
    const { length } = expenses;
    action.payload.id = length === 0 ? 0 : expenses[length - 1].id + 1;

    return {
      ...state,
      expenses: [
        ...state.expenses,
        action.payload,
      ],
    };
  }
  case REMOVE_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.filter(({ id }) => action.id !== id),
    };
  case UPDATE_EXPENSE:
    return {
      ...state,
      expenses: updatedExpenses(state.expenses, action.payload.expense),
    };
  case ADD_CURRENCIES:
    return {
      ...state,
      currencies: action.payload.currencies,
    };
  default:
    return state;
  }
};

export default wallet;
