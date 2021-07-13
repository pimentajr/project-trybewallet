const LOGIN = 'LOGIN';

export const setLogin = (email) => ({
  type: LOGIN,
  email,
});

export const addExpensesAction = (payload, id) => ({
  type: 'ADD_EXPENSES',
  payload,
  id,
});

export const removeExpensesAction = (id) => ({
  type: 'REMOVE_EXPENSES',
  id,
});

export const saveCoins = () => ({
  type: 'REQUEST_COIN',
});

export const receiveCoins = (values) => ({
  type: 'RECEIVE_COIN',
  values,
});

export function fetchCoin() {
  return async (dispatch) => {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const resultCoin = await response.json();

    dispatch(receiveCoins(resultCoin));
  };
}
