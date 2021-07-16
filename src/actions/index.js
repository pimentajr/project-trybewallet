// Coloque aqui suas actions

export const USER_LOGIN = 'USER_LOGIN';

export const loginUserWallet = (payload) => ({
  type: USER_LOGIN,
  payload,
});

export const REQUEST_COINS = 'REQUEST_COINS';

export const fetchCoins = (payload) => ({
  type: REQUEST_COINS,
  payload,
});

export const REQUEST_SUCESS = 'REQUEST_SUCESS';

export const fetchSucess = (payload) => ({
  type: REQUEST_SUCESS,
  payload,
});

export function fetchCoinsOnApi() {
  return (dispatch) => fetch('https://economia.awesomeapi.com.br/json/all')
    .then((result) => result.json())
    .then((currencies) => dispatch(fetchSucess(currencies)));
};
