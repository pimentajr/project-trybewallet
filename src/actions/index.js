export const GET_LOGIN = 'GET_LOGIN';
export const REQUEST_CURRENCIES = 'REQUEST_CURRENCIES';
export const REQUEST_CURRENCIES_SUCCESS = 'REQUEST_CURRENCIES_SUCCESS';
export const REQUEST_CURRENCIES_ERROR = 'REQUEST_CURRENCIES_ERROR';
export const REQUEST_NEW_CURRENCIES = 'REQUEST_NEW_CURRENCIES';

export const getLogin = (email) => ({
  type: GET_LOGIN,
  email,
});

const requestCurrencies = (payload) => ({
  type: REQUEST_CURRENCIES,
  payload,
});

const requestCurrenciesSuccess = (payload) => ({
  type: REQUEST_CURRENCIES_SUCCESS,
  payload,
});

const requestCurrenciesError = (payload) => ({
  type: REQUEST_CURRENCIES_ERROR,
  payload,
});

const requestNewCurrencies = (payload, newCoins) => ({
  type: REQUEST_NEW_CURRENCIES,
  payload,
  newCoins,
});

export function fetchCurrencies(payload = false) {
  return (dispatch) => {
    dispatch(requestCurrencies());
    return fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json())
      .then((currencies) => (
        payload
          ? dispatch(requestNewCurrencies(payload, currencies))
          : dispatch(requestCurrenciesSuccess(currencies))))
      .catch((erro) => dispatch(requestCurrenciesError(erro)));
  };
}
