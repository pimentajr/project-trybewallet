// Coloque aqui suas actions
const LOGIN = 'LOGIN';
const CURRENCIES = 'CURRENCIES';
const SAVE_EXPENSE = 'SAVE_EXPENSE';
const DELETE_EXPENSE = 'DELETE_EXPENSE';
const EDIT_EXPENSE = 'EDIT_EXPENSE';
const SAVE_EDITED_EXPENSE = 'SAVE_EDITED_EXPENSE';

export const walletLogin = (userEmail) => ({
  type: LOGIN,
  user: userEmail,
});

export const walletCurrencies = (currencies) => ({
  type: CURRENCIES,
  payload: {
    currencies,
  },
});

export const saveExpense = (expense) => ({
  type: SAVE_EXPENSE,
  payload: {
    expense,
  },
});

export const removeSpecificExpense = (expenseId) => ({
  type: DELETE_EXPENSE,
  payload: {
    expenseId,
  },
});

export const editSpecificExpense = (expenseId) => ({
  type: EDIT_EXPENSE,
  payload: {
    expenseId,
  },
});

export const saveEdited = (editingId, expenseInfo) => ({
  type: SAVE_EDITED_EXPENSE,
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
