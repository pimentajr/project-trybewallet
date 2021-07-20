export const USER_EMAIL = 'USER_EMAIL';
export const REQUEST_CURRENCIES = 'REQUEST_CURRENCIES';
export const REQUEST_CURRENCIES_SUCCESS = 'REQUEST_CURRENCIES_SUCCESS';
export const REQUEST_CURRENCIES_ERROR = 'REQUEST_CURRENCIES_ERROR';
export const REQUEST_EXPENSES_SUCCESS = 'REQUEST_EXPENSES_SUCCESS';
export const EXPENSES_DELETE = 'EXPENSES_DELETE';

export function userEmail(payload) {
  return {
    type: USER_EMAIL,
    payload,
  };
}

export function requestCurrencies(payload) {
  return {
    type: REQUEST_CURRENCIES,
    payload,
  };
}

export function requestCurrenciesSuccess(payload) {
  return {
    type: REQUEST_CURRENCIES_SUCCESS,
    payload,
  };
}

export function requestCurrenciesError(payload) {
  return {
    type: REQUEST_CURRENCIES_ERROR,
    payload,
  };
}

export function fetchCurrencies() {
  return (dispatch) => {
    dispatch(requestCurrencies());
    return fetch('https://economia.awesomeapi.com.br/json/all')
      .then((res) => res.json()
        .then((data) => dispatch(requestCurrenciesSuccess(data)),
          (error) => dispatch(requestCurrenciesError(error))));
  };
}

export function requestExpensesSuccess(stateForm, value, data) {
  return {
    type: REQUEST_EXPENSES_SUCCESS,
    stateForm,
    value: Number(value * data[stateForm.currency].ask),
    data,
  };
}

export function fetchExpenses(stateForm, value) {
  return (dispatch) => {
    dispatch(requestCurrencies());
    return fetch('https://economia.awesomeapi.com.br/json/all')
      .then((res) => res.json()
        .then((data) => dispatch(requestExpensesSuccess(stateForm, value, data)),
          (error) => dispatch(requestCurrenciesError(error))));
  };
}

export function expensesDelete(expenses, total) {
  return {
    type: EXPENSES_DELETE,
    expenses,
    total,
  };
}
