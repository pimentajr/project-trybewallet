export const LOGIN = 'LOGIN';
export const SPENDING = 'SPENDING';
export const REQUEST_COINS = 'REQUEST_COINS';
export const REQUEST_COINS_SUCCESS = 'REQUEST_COINS_SUCCESS';
export const REQUEST_COINS_ERROR = 'REQUEST_COINS_ERROR';
export const ADD_EXPENSES = 'ADD_EXPENSES';
export const ADD_EXPENSES_SUCCESS = 'ADD_EXPENSES_SUCCESS';

export const requestLogin = (payload) => ({
  type: LOGIN,
  payload,
});

export const requestCoin = () => ({
  type: REQUEST_COINS,
});

export const requestCoinSuccess = (coins) => ({
  type: REQUEST_COINS_SUCCESS,
  coins,
});

export const requestCoinError = (coins) => ({
  type: REQUEST_COINS_ERROR,
  coins,
});

export const addExpensesSuccess = (state) => ({
  type: ADD_EXPENSES_SUCCESS,
  state,
});

export function fetchCoins() {
  return (dispatch) => fetch('https://economia.awesomeapi.com.br/json/all')
    .then((result) => result.json())
    .then((result) => dispatch(requestCoinSuccess(result)));
}
