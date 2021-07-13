import API from '../services/baseAPI';

export const LOGIN = 'LOGIN';
export const GET_CURRENCY = 'GET_CURRENCY';
export const ADD_EXPENSE = 'ADD_EXPENSE';

export const getEmail = (payload) => ({
  type: LOGIN,
  payload,
});

export const getCurrency = (payload) => ({
  type: GET_CURRENCY,
  payload,
});

export function addExpenses(expense) {
  return (dispatch) => API()
    .then((result) => dispatch({
      type: ADD_EXPENSE,
      payload: { ...expense, exchangeRates: result },
    }));
}
