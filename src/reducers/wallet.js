import { ADD_EXPENSE, DELETE_EXPENSE, EDIT_EXPENSE, SAVE_EXPENSE } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  isEditingExpense: false,
  editingExpenseId: '',
};

function walletReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case ADD_EXPENSE:
    return { ...state, expenses: [...state.expenses, action.payload] };
  case DELETE_EXPENSE:
    return { ...state, expenses: state.expenses.filter(({ id }) => id !== action.id) };
  case EDIT_EXPENSE:
    return { ...state, isEditingExpense: true, editingExpenseId: action.id };
  case SAVE_EXPENSE: {
    const expenseIndex = state.expenses.findIndex(({ id }) => id === action.payload.id);
    const newExpenses = [...state.expenses];
    newExpenses[expenseIndex] = { ...action.payload };
    return { ...state, expenses: newExpenses, isEditingExpense: false };
  }
  default:
    return state;
  }
}

export default walletReducer;
