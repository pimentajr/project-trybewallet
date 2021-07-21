// Coloque aqui suas actions
export const LOGIN = 'LOGIN';
export const REQUEST_CURRENCIES = 'REQUEST_CURRENCIES';
export const RECEIVED_CURRENCIES = 'RECEIVED_CURRENCIES';
export const NEW_DISPENSE = 'NEW_DISPENSE';
export const EXCHANGE_RATES = 'ENCHANGE_RATES';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';

export const saveEmail = (payload) => ({
  type: LOGIN,
  payload,
});

export const requestCurrencies = () => ({
  type: REQUEST_CURRENCIES,
});

export const receivedCurrencies = (payload) => ({
  type: RECEIVED_CURRENCIES,
  payload,
});

export const newDispense = (payload) => ({
  type: NEW_DISPENSE,
  payload,
});

export const setExchangeRates = (payload) => ({
  type: EXCHANGE_RATES,
  payload,
});

export const deleteExpense = (payload) => ({
  type: DELETE_EXPENSE,
  payload,
});
