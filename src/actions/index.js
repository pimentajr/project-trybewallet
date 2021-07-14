// Coloque aqui suas actions
export const USER_LOGIN = 'USER_LOGIN';
export const REQUEST_CURRENCIES = 'GET_CURRENCIES';
export const REQUEST_CURRENCIES_SUCCESS = 'REQUEST_CURRENCIES';
export const REQUEST_CURRENCIES_FAILED = 'REQUEST_CURRENCIES_FAILED';
export const ADD_EXPENSE = 'ADD_EXPENSE';

export const userLogin = (email) => ({
  type: USER_LOGIN,
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

export const addExpense = (state) => ({
  type: ADD_EXPENSE,
  payload: state,
});
