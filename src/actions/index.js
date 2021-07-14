// Coloque aqui suas actions
const USER_ACTION = 'USER_ACTION';
const WALLET_ACTION = 'WALLET_ACTION';
const REQUEST_CURRENCY = 'REQUEST_CURRENCY';
const RECEIVED_CURRENCY = 'RECEIVED_CURRENCY';

export const userAction = (param) => ({
  type: USER_ACTION,
  param,
});

export const walletAction = (param) => (dispatch) => fetch('https://economia.awesomeapi.com.br/json/all')
  .then((res) => res.json())
  .then((exchangeRates) => dispatch({
    type: WALLET_ACTION,
    param: { ...param, exchangeRates },
  }));

export const requestCurrencies = () => ({
  type: REQUEST_CURRENCY,
});

export const receivedCurrencies = (currencies) => ({
  type: RECEIVED_CURRENCY,
  currencies,
});

export function fetchCurrencies() {
  return (dispatch) => {
    dispatch(requestCurrencies());
    return fetch('https://economia.awesomeapi.com.br/json/all')
      .then((res) => res.json())
      .then((currencies) => dispatch(receivedCurrencies(currencies)));
  };
}
