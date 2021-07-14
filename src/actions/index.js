// Coloque aqui suas actions
export const INPUT_USER = 'INPUT_USER';
export const REQUEST_API = 'REQUEST_API';
export const REQUEST_API_SUCCESS = 'REQUEST_API_SUCCESS';
export const REQUEST_API_ERROR = 'REQUEST_API_ERROR';
export const ADD_EXPENSE = 'ADD_EXPENSE';

const inputUser = (email) => ({
  type: INPUT_USER,
  email,
});

export const requestApi = (payload) => ({
  type: REQUEST_API,
  payload,
});

export const requestApiSuccess = (payload) => ({
  type: REQUEST_API_SUCCESS,
  payload,
});

// const requestApiError = (payload) => ({
//   type: REQUEST_API_ERROR,
//   payload,
// });

export function fetchApi() {
  return (dispatch) => {
    dispatch(requestApi());
    return fetch('https://economia.awesomeapi.com.br/json/all')
      .then((data) => data.json())
      .then((results) => dispatch(requestApiSuccess(results)));
  };
}

export function addExpense(expenses) {
  const expense = {
    type: ADD_EXPENSE,
    payload: expenses,
  };
  return (dispatch) => {
    dispatch(requestApi());
    return fetch('https://economia.awesomeapi.com.br/json/all')
      .then((data) => data.json())
      .then((results) => dispatch(requestApiSuccess(results)))
      .then(() => dispatch(expense));
  };
}

export default inputUser;
