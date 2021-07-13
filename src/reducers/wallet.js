// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { ADD_CURRENCY, ADD_EXPENSE, REMOVE_EXPENSE, EDIT_ON, EDIT_OFF } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editing: false,
  editedExpense: {},
};

function filterExpenses(expenses, editedExpense) {
  const newExpenses = expenses.map((expense, index) => {
    if (index === editedExpense.id) {
      return editedExpense
    }
    return expense
  });
  return newExpenses;
}

const wallet = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case ADD_CURRENCY:
    return { ...state, currencies: payload.map((item) => item.code) };
  case ADD_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, payload],
    };
  case REMOVE_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.filter((e) => e.id !== payload),
    };
  case EDIT_ON:
    return {
      ...state,
      editing: true,
      editedExpense: payload,
    };
  case EDIT_OFF:
    return {
      ...state,
      expenses: filterExpenses(state.expenses, payload),
      editing: false,
    };
  default:
    return state;
  }
};

export default wallet;
