import {
  REQUEST_CURRENCIES,
  RECEIVED_CURRENCIES,
  ADD_EXPENSE,
  REMOVE_EXPENSE,
  EDITING_EXPENSE,
} from '../actions';

const INITIAL_STATE = {
  isLoading: false,
  currencies: {},
  expenses: [],
  editExpense: {
    id: '',
    description: '',
    value: 0,
    currency: '',
    method: '',
    tag: '',
    exchangeRates: {},
    isEditind: false,
  },
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_CURRENCIES:
    return { ...state, isLoading: true };
  case RECEIVED_CURRENCIES:
    return { ...state, isLoading: false, currencies: action.payload };
  case ADD_EXPENSE:
    return { ...state, expenses: [...state.expenses, action.payload] };
  case REMOVE_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.filter((expense) => expense.id !== action.payload),
    };
  case EDITING_EXPENSE:
    return {
      ...state,
      editExpense: {
        isEditind: true,
        ...state.expenses.filter((expense) => (
          expense.id === action.payload
        ))[0],
      },
    };
  default:
    return state;
  }
};

export default wallet;
