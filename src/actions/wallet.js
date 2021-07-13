export const REQUEST_CURRENCIES = 'REQUEST_CURRENCIES';
export const REQUEST_SUCCESS = 'REQUEST_SUCCESS';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const UPDATE_CURRENCY = 'UPDATE_CURRENCY';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';
export const EDIT_EXPENSE_BTN = 'EDIT_EXPENSE_BTN';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';

const requestCurrencies = () => ({
  type: REQUEST_CURRENCIES,
});

const requestCurrenciesSuccess = (currencies) => ({
  type: REQUEST_SUCCESS,
  currencies,
});

export const fetchCurrencies = () => (dispatch) => {
  dispatch(requestCurrencies());
  return fetch('https://economia.awesomeapi.com.br/json/all')
    .then((result) => result.json())
    .then((currencies) => dispatch(requestCurrenciesSuccess(currencies)));
};

export const addExpense = (state) => ({
  type: ADD_EXPENSE,
  state,
});

export const deleteExpense = (expense) => ({
  type: DELETE_EXPENSE,
  expense,
});

export const enableEditExpense = (payload) => ({
  type: EDIT_EXPENSE_BTN,
  payload,
});

export const editExpense = (payload) => ({
  type: EDIT_EXPENSE,
  payload,
});
