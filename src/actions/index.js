import fetchAPI from '../api/apiFetch';

export const LOGIN = 'USER';
export const ADD_CURRENCIES = 'ADD_CURRENCIES';
export const ADD_EXPENSES = 'ADD_EXPENSES';

export const login = (payload) => ({
  type: LOGIN,
  payload,
});

export const moneyCurrencies = (payload) => ({
  type: ADD_CURRENCIES,
  payload,
});

export const apiFetching = () => (dispatch) => {
  fetchAPI()
    .then((currenciesFromAPI) => {
      dispatch(moneyCurrencies({
        currencies: currenciesFromAPI,
      }));
    });
};

export const addExpenses = (payload) => ({
  type: ADD_EXPENSES,
  payload,
});
