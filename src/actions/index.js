export const GET_LOGIN = 'GET_LOGIN';
export const REQUEST_CURRENCIES = 'REQUEST_CURRENCIES';
export const REQUEST_CURRENCIES_SUCCESS = 'REQUEST_CURRENCIES_SUCCESS';
export const REQUEST_CURRENCIES_ERROR = 'REQUEST_CURRENCIES_ERROR';

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

export function fetchCurrencies() {
  return (dispatch) => {
    dispatch(requestCurrencies());
    return fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json())
      .then((currencies) => dispatch(requestCurrenciesSuccess(currencies)))
      .catch((erro) => dispatch(requestCurrenciesError(erro)));
  };
}
