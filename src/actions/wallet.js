export const REQUEST_CURRENCIES = 'REQUEST_CURRENCIES';
export const REQUEST_SUCCESS = 'REQUEST_SUCCESS';
export const REQUEST_EXPENSES = 'REQUEST_EXPENSES';

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
// const requestUpdatedCurrencySuccess = (currencies) => ({
//   type: 'REQUEST_UPDATES_CURRENCYS,
//   currencies
// });

export const requestExpenses = (state, updateCurrencies) => ({
  type: REQUEST_EXPENSE,
  state,
  updateCurrencies,
});

export const updateCurrencyToNewExpense = (state) => (dispatch) => {
  dispatch(requestCurrencies());
  return fetch('https://economia.awesomeapi.com.br/json/all')
    .then((result) => result.json())
    .then((currencies) => dispatch(requestCurrenciesSuccess(currencies)))
    .then((updateCurrencies) => dispatch(addExpense(state, updateCurrencies)));
};

export const requestDelet = (expense) => ({
  type: REQUEST_DELETE,
  expense,
});
