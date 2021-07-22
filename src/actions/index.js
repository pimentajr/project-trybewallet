// Coloque aqui suas actions
export const USER_DATA = 'USER_DATA';
export const SUCCESS_FETCH = 'SUCCESS_FETCH';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const SEND_EXPENSES = 'SEND_EXPENSES';
export const DEL_EXPENSE = 'DEL_EXPENSE';

export const userData = (email) => ({
  type: 'USER_DATA',
  email,
});

export const successFetch = (coin) => ({
  type: 'SUCCESS_FETCH',
  coin,
});

export const addExpense = (expense) => ({
  type: 'ADD_EXPENSE',
  expense,
});

export const deleteExpense = (payload) => ({
  type: 'DEL_EXPENSE',
  payload,
});
