// Coloque aqui suas actions
export const USER_EMAIL = 'USER_EMAIL';
export const CURRENCIES = 'CURRENCIES';
export const RECEIVE_API = 'RECEIVE_API';
export const ADD_EXPENSES = 'ADD_EXPENSES';
export const DLT_EXPENSE = 'DLT_EXPENSE';

export function storeUserEmail(email) {
  return {
    type: USER_EMAIL,
    payload: email,
  };
}

export function storeCurrencies(payload) {
  return {
    type: CURRENCIES,
    payload,
  };
}

export function addExpenses(payload) {
  return {
    type: ADD_EXPENSES,
    payload,
  };
}

export function deleteItem(payload) {
  return {
    type: DLT_EXPENSE,
    payload,
  };
}

export function APIRequest() {
  return { type: RECEIVE_API };
}

export const fetchCurrencyList = () => async (dispatch) => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const responseObject = await response.json();
  return dispatch(storeCurrencies(responseObject));
};
