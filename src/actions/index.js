export const SET_USER = 'SET_USER';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const REMOVE_EXPENSE = 'REMOVE_EXPENSE';

export const REQUEST_API = 'REQUEST_API';
export const REQUEST_API_SUCCESS = 'REQUEST_API_SUCCESS';
export const REQUEST_API_ERROR = 'REQUEST_API_ERROR';

export const EDIT_EXPENSE = 'EDIT_EXPENSE';
export const OPEN_EXPENSE = 'OPEN_EXPENSE';

export const setUser = (payload) => ({ type: SET_USER, payload });
export const addExpense = (payload) => ({ type: ADD_EXPENSE, payload });
export const removeExpense = (payload) => ({ type: REMOVE_EXPENSE, payload });

export const editExpense = (payload) => ({ type: EDIT_EXPENSE, payload });
export const openExpense = (payload) => ({ type: OPEN_EXPENSE, payload });

const requestAPI = (payload) => ({ type: REQUEST_API, payload });
const requestApiSuccess = (payload) => ({ type: REQUEST_API_SUCCESS, payload });
const requestApiError = (payload) => ({ type: REQUEST_API_ERROR, payload });

export const fetchAPI = () => async (dispatch) => {
  dispatch(requestAPI());
  try {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const results = await response.json();
    dispatch(requestApiSuccess(results));
  } catch (error) {
    dispatch(requestApiError(error));
  }
};
