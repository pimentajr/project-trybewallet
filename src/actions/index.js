// Coloque aqui suas actions
import { fecthAPI } from '../services';

export const NEW_USER = 'NEW_USER';
export const REQUEST_API = 'REQUEST_API';
export const REQUEST_ERROR = 'REQUEST_ERROR';
export const REQUEST_SUCCESS = 'REQUEST_SUCCESS';
export const ADD_EXPENSES = 'ADD_EXPENSES';
export const DELETE_EXPENSES = 'DELETE_EXPENSES';

export const newUser = (payload) => ({
  type: NEW_USER,
  payload,
});

const requestAPI = (payload) => ({
  type: REQUEST_API,
  payload,
});

const requestError = (payload) => ({
  type: REQUEST_ERROR,
  payload,
});

const requestSuccess = (payload) => ({
  type: REQUEST_SUCCESS,
  payload,
});

export const addExpenses = (expenses) => ({
  type: ADD_EXPENSES,
  expenses,
});

export const deleteExpense = (idExpenses) => ({
  type: DELETE_EXPENSES,
  idExpenses,
});

export function setCoins() {
  return (dispatch) => {
    dispatch(requestAPI());
    return fecthAPI()
      .then(
        (data) => dispatch(requestSuccess(data)),
        (error) => dispatch(requestError(error.message)),
      );
  };
}
