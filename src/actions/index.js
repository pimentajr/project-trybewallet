import fetchApi from '../services/CurrencyApi';

const SET_USER_EMAIL = 'SET_USER_EMAIL';
const SEND_RESPONSE_FROM_API_TO_STORE = 'SEND_RESPONSE_FROM_API_TO_STOR';
const API_ERROR = 'API_ERROR';
const ADD_SPENT = 'ADD_SPENT';

function enviaEmailParaStore(email) { // para salvar o email difgitado no login na store
  return {
    type: SET_USER_EMAIL,
    email,
  };
}

function sendFromApiToStore(payload) { // para enviar dados da api para store
  return {
    type: SEND_RESPONSE_FROM_API_TO_STORE,
    payload,
  };
}

function apiError(error) { // quando a api da erro, salva e erro na store
  return {
    type: API_ERROR,
    error,
  };
}

function deleteExpense(id) {
  return {
    type: 'DELETE_EXPENSE',
    id,
  };
}

export const saveExpenses = (expenses, exchangeRates) => ({
  type: 'SAVE_EXPENSES',
  payload: {
    ...expenses,
    exchangeRates,
  },
});

function fetchExchangeRates(expense) {
  return (dispatch) => (
    fetchApi()
      .then(
        (data) => dispatch(saveExpenses(expense, data)),
      )
  );
}

/* export function spending(currencies, expenses) {
  return ({
    type: ADD_SPENT,
    currencies,
    expenses,
  });
} */

// thunk : para fazer um dispatch assincrono

function currencyApiThunk() {
  return (dispatch) => (
    fetchApi()
      .then(
        (data) => dispatch(sendFromApiToStore(Object.values(data))),
      )
      .catch(
        (error) => dispatch(apiError(error.message)),
      )
  );
}

export {
  enviaEmailParaStore,
  SET_USER_EMAIL,
  sendFromApiToStore,
  SEND_RESPONSE_FROM_API_TO_STORE,
  API_ERROR,
  apiError,
  currencyApiThunk,
  ADD_SPENT,
  deleteExpense,
  fetchExchangeRates,
};
