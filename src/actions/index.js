// Coloque aqui suas actions

import requestApi from '../Helpers/RequestApi';

export const LOGIN_USER = 'LOGIN-USER';
export const REQUESTING_COINS = 'REQUESTING_COINS';
export const RECEIVE_COINS = 'RECEIVE_COINS';
export const RECEIVE_EXPENSE_DATA = 'RECEIVE_EXPENSE_DATA';

export const delExpenseAction = (id) => ({ type: 'DELETE_EXPENSE', id });

export const loginUser = (email) => ({
  type: LOGIN_USER,
  email,
});
export const requestingData = () => ({
  type: REQUESTING_COINS,
});
export const receiveCoins = (coins) => ({
  type: RECEIVE_COINS,
  coins,
});
export const requestCoins = () => (dispatch) => {
  dispatch(requestingData());
  return (
    requestApi()
      .then((data) => {
        const coins = Object.keys(data).filter((curr) => curr !== 'USDT');
        dispatch(receiveCoins(coins));
      })
  );
};

export const receiveExpenseData = (expenseEntries, data) => ({
  type: RECEIVE_EXPENSE_DATA,
  payload: {
    expenseEntries,
    data,
  },
});

export const requestExpense = (expenseEntries) => (dispatch) => {
  dispatch(requestingData());
  return (
    requestApi()
      .then((data) => {
        dispatch(receiveExpenseData(expenseEntries, data));
      })
  );
};
