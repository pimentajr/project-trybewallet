import fetchCurrencies from '../services/api';

export const LOGIN_USER = 'LOGIN_USER';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const GET_CURRENCY_SUCCESS = 'GET_CURRENCY_SUCCESS';

export const logInUser = (email) => ({
  type: LOGIN_USER,
  payload: email,
});

export const addExpense = (expense) => ({
  type: ADD_EXPENSE,
  payload: expense,
});

export const getCurrencySuccess = (currencies) => ({
  type: GET_CURRENCY_SUCCESS,
  payload: currencies,
});

export const getCurrencies = () => (dispatch) => {
  fetchCurrencies()
    .then((currencies) => dispatch(getCurrencySuccess(Object.keys(currencies))));
};
