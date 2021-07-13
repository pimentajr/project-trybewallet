export const USER_INFO = 'USER_INFO';
export const REMOVE_EXPENSE = 'REMOVE_EXPENSE';
export const DATA_FAILURE = 'DATA_FAILURE';
export const GET_DATA = 'GET_DATA';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const GET_CURRENCIES = 'GET_CURRENCIES';
export const UPDATE_EXPENSE = 'UPDATE_EXPENSE';

export const sendInfo = (payload) => ({ type: USER_INFO, payload });

export const removeExpense = (payload) => ({ type: REMOVE_EXPENSE, payload });

export const getCurrencies = (payload) => ({ type: GET_CURRENCIES, payload });

export const dataFailure = (payload) => ({ type: DATA_FAILURE, payload });

export const addExpense = (payload) => ({ type: ADD_EXPENSE, payload });

export const updateExpense = (payload) => ({ type: UPDATE_EXPENSE, payload });
