// Coloque aqui suas actions
export const SEND_EMAIL = 'SEND_EMAIL';
export const REQUEST_CURRENCIES = 'GET_CURRENCIES';
export const REQUEST_CURRENCIES_SUCCESS = 'REQUEST_CURRENCIES';
export const REQUEST_CURRENCIES_FAILED = 'REQUEST_CURRENCIES_FAILED';

export const sendEmail = (email) => ({
  type: SEND_EMAIL,
  email,
});

function requestCurrencies() {
  return {
    type: REQUEST_CURRENCIES,
  };
}

function requestCurrenciesSuccess(json) {
  return {
    type: REQUEST_CURRENCIES_SUCCESS,
    payload: json,
  };
}

function requestCurrenciesFailed(error) {
  return {
    type: REQUEST_CURRENCIES_FAILED,
    payload: error,
  };
}

export function getCurrencies() {
  return (dispatch) => {
    dispatch(requestCurrencies());
    return fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json()
        .then(
          (json) => dispatch(requestCurrenciesSuccess(json)),
          (error) => dispatch(requestCurrenciesFailed(error)),
        ));
  };
}
