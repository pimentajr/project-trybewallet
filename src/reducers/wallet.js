// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import {
  CURRENCIES, SAVE_EXPENSE, DELETE_EXPENSE, EDIT_EXPENSE, SAVE_EDITED_EXPENSE,
} from '../actions/actionTypes';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editingId: -1,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case CURRENCIES:
    return {
      ...state,
      currencies: [...action.payload.currencies],
    };
  case SAVE_EXPENSE:
    return {
      ...state,
      expenses: [
        ...state.expenses,
        { id: state.expenses.length, ...action.payload.expense },
      ],
    };
  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: [
        ...(state.expenses.filter((expense) => expense.id !== action.payload.expenseId)),
      ],
    };
  case EDIT_EXPENSE:
    return {
      ...state,
      editingId: action.payload.expenseId,
    };
  case SAVE_EDITED_EXPENSE:
    return {
      ...state,
      editingId: -1,
      expenses: [
        ...(state.expenses.map((expense) => {
          if (expense.id === action.payload.editingId) {
            return (
              { ...expense, ...action.payload.expenseInfo }
            );
          }
          return expense;
        })),
      ],
    };
  default:
    return state;
  }
};

export default wallet;
