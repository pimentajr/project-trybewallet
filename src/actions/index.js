// Coloque aqui suas actions
export const SET_EMAIL = 'SET_EMAIL';
export const REQUEST_API = 'REQUEST_API';
export const REQUEST_SUCCEED = 'REQUEST_SUCCEED';
export const REQUEST_FAIL = 'REQUEST_FAIL';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const FAIL_ADD_EXPENSE = 'FAIL_ADD_EXPENSE';

export const setEmail = (email) => ({
  type: SET_EMAIL,
  payload: email,
});

export const requestApi = () => ({
  type: REQUEST_API,
});

export const requestSuccess = (obj) => ({
  type: REQUEST_SUCCEED,
  payload: Object.keys(obj).filter((currency) => currency !== 'USDT'),
});

export const requestFailed = (error) => ({
  type: REQUEST_FAIL,
  payload: error,
});

export const addExpenseSuccess = (payload) => ({
  type: ADD_EXPENSE,
  payload,
});

export const fetchAPI = () => async (dispatch) => {
  dispatch(requestApi());
  return fetch('https://economia.awesomeapi.com.br/json/all')
    .then((result) => result.json())
    .then((data) => dispatch(requestSuccess(data)))
    .catch((error) => dispatch(requestFailed(error)));
};

export const addExpense = (state) => (dispatch) => fetch('https://economia.awesomeapi.com.br/json/all')
  .then((result) => result.json())
  .then((data) => {
    const obj = {
      ...state,
      exchangeRates: data,
    };
    dispatch(addExpenseSuccess(obj));
  });
