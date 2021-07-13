// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import {
  ADD_EXPENSE,
  UPDATE_EXPENSE,
  EDIT_EXPENSE,
  DELETE_EXPENSE,
  SUCESS_REQUEST,
  FAILED_REQUEST,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  error: '',
  spends: 0.00,
  exchange: 'BRL',
  editExp: {},
};

function getSpends(expenses) {
  return expenses.reduce((
    (acc, { value, currency, exchangeRates }) => (
      acc + (parseFloat(value) * exchangeRates[currency].ask)
    )), 0);
}

function getExpense(id, expenses) {
  return expenses.find((expense) => expense.id === id);
}

function wallet(state = INITIAL_STATE, { type, expense, currencies, error, id }) {
  switch (type) {
  case ADD_EXPENSE: {
    const expenses = [...state.expenses, expense];
    return { ...state, expenses, spends: getSpends(expenses), editExp: {} }; }
  case UPDATE_EXPENSE: {
    const expenses = [...state.expenses];
    expenses[expense.id] = expense;
    return { ...state, expenses, spends: getSpends(expenses), editExp: {} }; }
  case EDIT_EXPENSE: {
    const editExp = getExpense(id, state.expenses);
    return { ...state, editExp }; }
  case DELETE_EXPENSE: {
    const expenses = state.expenses.filter((exp) => exp.id !== id);
    return { ...state, expenses, spends: getSpends(expenses), editExp: {} }; }
  case SUCESS_REQUEST:
    return { ...state, currencies: [...state.currencies, currencies] };
  case FAILED_REQUEST:
    return { ...state, error };
  default:
    return state;
  }
}

export default wallet;
