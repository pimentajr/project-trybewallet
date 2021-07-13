export const USER_LOGIN = 'USER_LOGIN';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';
export const SAVE_EXPENSE = 'SAVE_EXPENSE';

export const userLoginAction = (email) => ({
  type: USER_LOGIN,
  payload: email,
});

export const submitExpenseAction = (payload) => ({
  type: ADD_EXPENSE,
  payload,
});

export const deleteExpenseAction = (id) => ({
  type: DELETE_EXPENSE,
  id,
});

export const editExpenseAction = (id) => ({
  type: EDIT_EXPENSE,
  id,
});

export const saveExpenseAction = (payload) => ({
  type: SAVE_EXPENSE,
  payload,
});
