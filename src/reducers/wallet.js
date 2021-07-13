import { DATA_FAILURE,
  ADD_EXPENSE,
  REMOVE_EXPENSE,
  GET_CURRENCIES,
  UPDATE_EXPENSE } from '../actions';

const initialState = { currencies: [], expenses: [], total: 0 };

const redx = (prev, curr) => {
  const { currency, value, exchangeRates } = curr;
  const { ask } = exchangeRates[currency];
  return prev + value * ask;
};

const idElements = (expenses) => {
  if (expenses.length > 0) {
    const sorted = expenses.map((el) => (el.id)).sort((a, b) => b - a);
    return (parseInt(sorted, 10) + 1);
  } return 0;
};

const getExpenses = (payload, state) => {
  const { expenses } = state;
  const newExpense = { ...payload, id: idElements(expenses) };
  const updatedExpenses = [...state.expenses, newExpense];
  const total = updatedExpenses.reduce(redx, 0);
  return { ...state, expenses: updatedExpenses, total };
};

const walletReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
  case DATA_FAILURE: {
    return { ...state, payload };
  }
  case ADD_EXPENSE: {
    return getExpenses(payload, state);
  }
  case UPDATE_EXPENSE: {
    const replacedExpense = state.expenses.map((el) => (
      el.id !== payload.id ? el : payload));
    const newExpense = [...replacedExpense];
    const total = newExpense.reduce(redx, 0);
    return { ...state, expenses: newExpense, total };
  }

  case GET_CURRENCIES: {
    return { ...state, currencies: payload };
  }

  case REMOVE_EXPENSE: {
    const updatedExpenses = [...payload.filter((el) => state.expenses.includes(el))];
    const total = updatedExpenses.reduce(redx, 0);
    return { ...state, expenses: updatedExpenses, total };
  }

  default:
    return { ...state };
  }
};

export default walletReducer;
