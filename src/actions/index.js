// Coloque aqui suas actions
export const SET_EMAIL = 'SET_EMAIL';
export const REQUEST_SUCCEED = 'REQUEST_SUCCEED';
export const REQUEST_FAIL = 'REQUEST_FAIL';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const REQUEST_EXPENSE = 'REQUEST_EXPENSE';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';

export const setEmail = (email) => ({
  type: SET_EMAIL,
  payload: email,
});

export const requestSuccess = (data) => ({
  type: REQUEST_SUCCEED,
  payload: data.filter((result) => result.codein !== 'BRLT'),
});

export const requestFailed = (error) => ({
  type: REQUEST_FAIL,
  payload: error,
});

export const addExpense = (expense) => ({
  type: ADD_EXPENSE,
  payload: expense,
});

export const deleteExpense = (id) => ({
  type: DELETE_EXPENSE,
  payload: id,
});

export const fetchAPI = () => async (dispatch) => (
  fetch('https://economia.awesomeapi.com.br/json/all').then((result) => result.json())
    .then((data) => dispatch(requestSuccess(Object.values(data))))
    .catch((error) => dispatch(requestFailed(error)))
);
