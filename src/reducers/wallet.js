import {
  REQUEST_CURRENCIES,
  REQUEST_SUCCESS,
  ADD_EXPENSE,
  DELETE_EXPENSE,
  EDIT_EXPENSE_BTN,
  EDIT_EXPENSE,
} from '../actions/wallet';

const INITIAL_STATE = {
  currencies: [],
  currentRates: {},
  expenses: [],
  enableEdit: false,
  expenseToEdit: {},
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_CURRENCIES:
    return {
      ...state,
    };
  case REQUEST_SUCCESS:
    return {
      ...state,
      currencies: Object.keys(action.currencies),
      currentRates: action.currencies,
    };
  case ADD_EXPENSE: {
    return {
      ...state,
      expenses: [...state.expenses, action.state],
    };
  }
  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.filter((expense) => expense.id !== action.expense.id),
    };
  case EDIT_EXPENSE_BTN:
    return {
      ...state,
      enableEdit: true,
      expenseToEdit: state.expenses.find((expense) => expense.id === action.payload),
    };
  case EDIT_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.map((expense) => {
        if (expense.id === state.expenseToEdit.id) {
          return {
            ...action.payload,
            exchangeRates: expense.exchangeRates,
            id: state.expenseToEdit.id,
          };
        }
        return expense;
      }),
      enableEdit: false,
    };
  default:
    return state;
  }
};

export default wallet;
