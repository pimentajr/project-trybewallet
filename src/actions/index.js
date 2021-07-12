// Coloque aqui suas actions
export const ADD_EMAIL = 'ADD_EMAIL';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const REQUEST_CURRENCIES = 'REQUEST_CURRENCIES';
export const GET_CURRENCIES = 'GET_CURRENCIES';
export const FAILED_REQUEST = 'FAILED_REQUEST';

export const addEmail = (email) => ({
  type: ADD_EMAIL,
  email,
});

export const addExpense = (expense, json) => ({
  type: ADD_EXPENSE,
  expense,
  payload: json,
});

export const requestCurrencies = () => ({
  type: REQUEST_CURRENCIES,
});

export const failedRequest = (error) => ({
  type: FAILED_REQUEST,
  payload: error,
});

export const fetchCurrencies = (expense) => (dispatch) => {
  dispatch(requestCurrencies());
  return fetch('https://economia.awesomeapi.com.br/json/all')
    .then((r) => r.json()
      .then(
        (json) => dispatch(addExpense(expense, json)),
        (error) => dispatch(failedRequest(error)),
      ));
};
