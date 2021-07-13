import { REQUEST_API,
  REQUEST_API_SUCCESS,
  REQUEST_API_ERROR,
  ADD_EXPENSE,
  REMOVE_EXPENSE,
  EDIT_EXPENSE,
  OPEN_EXPENSE,
} from '../actions';

const INITIAL_STATE = {
  currencies: '',
  isEditingExpense: false,
  expenses: [],
  idCounter: 0,
};

function walletReducer(state = INITIAL_STATE, action) {
  const { payload, type } = action;
  const { expenses, currencies, idCounter } = state;
  switch (type) {
  case REQUEST_API:
    return { ...state, isLoading: true };
  case REQUEST_API_SUCCESS:
    return { ...state, currencies: payload, isLoading: false };
  case REQUEST_API_ERROR:
    return { ...state, error: payload, isLoading: false };
  case ADD_EXPENSE:
    return {
      ...state,
      expenses: [...expenses, {
        ...payload,
        id: idCounter,
        exchangeRates: currencies,
      }],
      isLoading: false,
      idCounter: idCounter + 1,
    };
  case REMOVE_EXPENSE:
    return {
      ...state,
      expenses: [...expenses.filter((expense) => expense !== payload)],
    };
  case OPEN_EXPENSE:
    return { ...state, isEditingExpense: true };
  case EDIT_EXPENSE:
    return {
      ...state,
      expenses: expenses
        .reduce((arr, expense) => (
          expense.id !== payload.id ? arr.concat(expense) : arr.concat(payload)), []),
      isEditingExpense: false,
    };
  default:
    return state;
  }
}

export default walletReducer;
