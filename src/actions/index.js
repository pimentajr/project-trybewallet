export const SAVE_LOGIN_NAME = 'SAVE_LOGIN_NAME';
export const FETCHING_CURRENCY = 'FETCHING_CURRENCY';
/* export const FETCH_COIN_SUCCEEDED = 'FETCH_COIN_SUCCEEDED';
export const FETCH_COIN_FAILED = 'FETCH_COIN_FAILED'; */
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const REMOVE_EXPENSE = 'REMOVE_EXPENSE';

export const saveLoginName = (payload) => ({
  type: SAVE_LOGIN_NAME,
  payload,
});

export const fetchCurrency = (payload) => ({
  type: FETCHING_CURRENCY,
  payload });

/* const fetchCoinSucceeded = (payload) => {
  const coin = Object.values(payload);
  coin.splice(1, 1); // deleta um elemento no index[1] (local do USDT)
  return {
    type: FETCH_COIN_SUCCEEDED,
    payload: coin.map((item) => item.code),
  };
}; */

/* const fetchCoinFailed = (payload) => ({
  type: FETCH_COIN_FAILED,
  payload,
}); */

const url = 'https://economia.awesomeapi.com.br/json/all';

/* export const fetchCoins = () => (dispatch) => fetch(url)
  .then((result) => result.json())
  .then((data) => dispatch(fetchCoinSucceeded(data)))
  .catch((error) => dispatch(fetchCoinFailed(error))); */

export const requestCurrency = () => (dispatch) => fetch(url)
  .then((result) => result.json())
  .then((data) => dispatch(fetchCurrency(data)));

export const addExpenseSucceded = (payload) => ({
  type: ADD_EXPENSE,
  payload,
});

export const addExpense = (state) => (dispatch) => fetch(url)
  .then((result) => result.json())
  .then((data) => {
    const obj = {
      ...state,
      exchangeRates: data,
    };
    dispatch(addExpenseSucceded(obj));
  });

export const removeExpense = (payload) => ({
  type: REMOVE_EXPENSE,
  payload,
});
