export const LOGIN_USER = 'LOGIN_USER';
export const REQUEST_CURRENCIES = 'REQUEST_CURRENCIES';
export const REQUEST_CURRENCIES_SUCCESS = 'REQUEST_CURRENCIES_SUCCESS';
export const REQUEST_CURRENCIES_FAILED = 'REQUEST_CURRENCIES_FAILED';

export const logEmail = (payload) => ({
  type: LOGIN_USER,
  payload,
});

const requestCurrenciesSuccess = (payload) => ({
  type: REQUEST_CURRENCIES_SUCCESS,
  payload,
});

const requestCurrenciesFailed = (payload) => ({
  type: REQUEST_CURRENCIES_FAILED,
  payload,
});

export const fetchCurr = () => (dispatch) => fetch('https://economia.awesomeapi.com.br/json/all')
  .then((result) => result.json())
  .then((data) => dispatch(requestCurrenciesSuccess(data)))
  .catch((fail) => dispatch(requestCurrenciesFailed(fail)));
