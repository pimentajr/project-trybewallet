export const SAVE_EMAIL = 'SAVE_EMAIL';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const REMOVE_EXPENSE = 'REMOVE_EXPENSE';
export const UPDATE_EXPENSE = 'UPDATE_EXPENSE';
export const ADD_CURRENCIES = 'ADD_CURRENCIES';

export const saveEmail = (email) => ({
  type: SAVE_EMAIL,
  email,
});

export const addExpense = (payload) => ({
  type: ADD_EXPENSE,
  payload,
});

export const fetchCurrencies = (payload) => (dispatch) => {
  const url = 'https://economia.awesomeapi.com.br/json/all';

  return fetch(url)
    .then((response) => response.json())
    .then((data) => {
      payload.exchangeRates = data;
      dispatch(addExpense(payload));
    });
};

export const removeExpense = (id) => ({
  type: REMOVE_EXPENSE,
  id,
});

export const updateExpense = (expense) => ({
  type: UPDATE_EXPENSE,
  payload: {
    expense,
  },
});

export const addCurrencies = (currencies) => ({
  type: ADD_CURRENCIES,
  payload: {
    currencies,
  },
});

export const fetchCurrenciesList = () => (dispatch) => {
  const url = 'https://economia.awesomeapi.com.br/json/all';

  return fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const currencies = Object.keys(data);

      const filteredCurrencies = currencies.filter((currency) => currency !== 'USDT');

      dispatch(addCurrencies(filteredCurrencies));
    });
};
