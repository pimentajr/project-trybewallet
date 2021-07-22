export const REQUEST_CURRENCIES = 'REQUEST_CURRENCIES';
export const REQUEST_SUCCESS = 'REQUEST_SUCCESS';
export const REQUEST_ADD_EXPENSE = 'REQUEST_ADD_EXPENSE';
export const REQUEST_UPDATE_CURRENCY = 'REQUEST_UPDATE_CURRENCY';
export const REQUEST_DELETE_EXPENSE = 'DELETE_EXPENSE';
export const REQUEST_EDIT_EXPENSE_BUTTON = 'EDIT_EXPENSE_BUTTON';
export const REQUEST_EDIT_EXPENSE = 'EDIT_EXPENSE';

const requestCurrencies = () => ({
  type: REQUEST_CURRENCIES,
});

const requestCurrenciesSuccess = (currencies) => ({
  type: REQUEST_SUCCESS,
  currencies,
});

export const fetchCurrencies = () => (dispatch) => {
  dispatch(requestCurrencies());
  return fetch('https://economia.awesomeapi.com.br/json/all')
    .then((result) => result.json())
    .then((currencies) => dispatch(requestCurrenciesSuccess(currencies)));
};

export const addExpense = (state) => ({
  type: REQUEST_ADD_EXPENSE,
  state,
});

export const deleteExpense = (expense) => ({
  type: REQUEST_DELETE_EXPENSE,
  expense,
});

export const enableEditExpense = (payload) => ({
  type: REQUEST_EDIT_EXPENSE_BUTTON,
  payload,
});

export const editExpense = (payload) => ({
  type: REQUEST_EDIT_EXPENSE,
  payload,
});
