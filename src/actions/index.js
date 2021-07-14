// Coloque aqui suas actions
export const LOGIN = 'LOGIN';
export const loginAction = (email) => ({ type: LOGIN, email });

export const ADD_EXPENSE = 'ADD_EXPENSE';
export const addExpense = (values) => ({ type: ADD_EXPENSE, values });
