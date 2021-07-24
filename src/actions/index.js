// Coloque aqui suas actions
import * as types from './actionTypes';

export const walletLogin = (userEmail) => ({
  type: types.LOGIN,
  user: userEmail,
});

export const walletCurrencies = (currencies) => ({
  type: types.CURRENCIES,
  payload: {
    currencies,
  },
});

export const saveExpense = (expense) => ({
  type: types.SAVE_EXPENSE,
  payload: {
    expense,
  },
});

export const removeSpecificExpense = (expenseId) => ({
  type: types.DELETE_EXPENSE,
  payload: {
    expenseId,
  },
});

export const editSpecificExpense = (expenseId) => ({
  type: types.EDIT_EXPENSE,
  payload: {
    expenseId,
  },
});

export const saveEdited = (editingId, expenseInfo) => ({
  type: types.SAVE_EDITED_EXPENSE,
  payload: {
    editingId,
    expenseInfo,
  },
});

export function fetchCurrencies() {
  const url = 'https://economia.awesomeapi.com.br/json/all';
  return (dispatch) => fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const currencies = Object.keys(data);
      dispatch(walletCurrencies(currencies));
    });
}

export function fetchAtualCotation(expenseInfo) {
  const url = 'https://economia.awesomeapi.com.br/json/all';
  return (dispatch) => fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const AllCurrencies = { ...data };
      const rejectedsCurrencies = ['DOGE'];
      rejectedsCurrencies.forEach((currency) => delete AllCurrencies[currency]);
      const exchangeRates = { ...AllCurrencies };
      const expense = {
        ...expenseInfo,
        exchangeRates,
      };
      dispatch(saveExpense(expense));
    });
}
