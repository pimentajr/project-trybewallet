export const ADDED_USER_EMAIL = 'ADDED_USER_EMAIL';
export const FETCH_CURRENCIES = 'FETCH_CURRENCIES';
export const FETCH_CURRENCIES_SUCCEEDED = 'FETCH_CURRENCIES_SUCCEEDED';
export const FETCH_CURRENCIES_FAILED = 'FETCH_CURRENCIES_FAILED';
export const WALLET_ADDED_EXPENSE = 'WALLET_ADDED_EXPENSE';
export const WALLET_REMOVED_EXPENSE = 'WALLET_REMOVED_EXPENSE';

const URL = 'https://economia.awesomeapi.com.br/json/all';

export const userEmail = (email) => ({
  type: ADDED_USER_EMAIL,
  email,
});

export const fetchCurrencies = () => ({
  type: FETCH_CURRENCIES,
});

export const fetchCurrenciesSucess = (currencies) => ({
  type: FETCH_CURRENCIES_SUCCEEDED,
  currencies,
});

export const fetchCurrenciesFail = (err) => ({
  type: FETCH_CURRENCIES_FAILED,
  err,
});

export const walletAddExpense = (expense) => ({
  type: WALLET_ADDED_EXPENSE,
  expense,
});

export const walletRemoveExpense = (expenseId) => ({
  type: WALLET_ADDED_EXPENSE,
  expenseId,
});

export const fetchAPI = () => (dispatch) => {
  dispatch(fetchCurrencies());
  fetch(URL)
    .then((response) => response.json())
    .then((data) => dispatch(fetchCurrenciesSucess(data)))
    .catch((err) => dispatch(fetchCurrenciesFail(err)));
};
