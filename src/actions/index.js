// Coloque aqui suas actions

export const SET_USER_EMAIL = 'SET_USER_EMAIL';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';
export const UPDATE_EXPENSE = 'UPDATE_EXPENSE';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';
export const SUCESS_REQUEST = 'SUCESS_REQUEST';
export const FAILED_REQUEST = 'FAILED_REQUEST';

export const setUserEmail = (email) => ({ type: SET_USER_EMAIL, email });
export const addExpense = (expense) => ({ type: ADD_EXPENSE, expense });
export const updateExpense = (expense) => ({ type: UPDATE_EXPENSE, expense });
export const editExpense = (id) => ({ type: EDIT_EXPENSE, id });
export const deleteExpense = (id) => ({ type: DELETE_EXPENSE, id });
export const setCurrencies = (currencie) => ({ type: SUCESS_REQUEST, currencie });
export const setError = (error) => ({ type: FAILED_REQUEST, error });

// Melhoria: Colocar um caso de erro, caso de espera(loading), etc...
