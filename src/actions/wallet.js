export const REQUEST_CURRENCIES = 'REQUEST_CURRENCIES';
export const REQUEST_SUCCESS = 'REQUEST_SUCCESS';
export const REQUEST_ADD_EXPENSES = 'REQUEST_ADD_EXPENSES';
export const REQUEST_UPDATE_CURRENCY = 'REQUEST_UPDATE_CURRENCY';

const requestCurrencies = () => ({
  type: REQUEST_CURRENCIES,
});

const requestSuccess = (currencies) => ({
  type: REQUEST_SUCCESS,
  currencies,
});

export const fetchCurrencies = () => (dispatch) => {
  dispatch(requestCurrencies());
  return fetch('https://economia.awesomeapi.com.br/json/all')
    .then((result) => result.json())
    .then((currencies) => dispatch(requestSuccess(currencies)));
};

export const addExpense = (state, updateCurrencies) => ({
  type: REQUEST_ADD_EXPENSES,
  state,
  updateCurrencies,
});

export const updateCurrencyToNewExpense = (state) => (dispatch) => {
  dispatch(requestCurrencies());
  return fetch('https://economia.awesomeapi.com.br/json/all')
    .then((result) => result.json())
    .then((currencies) => dispatch(requestSuccess(currencies)))
    .then((updateCurrencies) => dispatch(addExpense(state, updateCurrencies)));
};
