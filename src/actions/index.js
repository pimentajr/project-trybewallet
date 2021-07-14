// Coloque aqui suas actions
export const LOGIN = 'LOGIN';
export const login = (email) => ({
  type: LOGIN,
  email,
});

export const REQUEST_API = 'REQUEST_API';
export const SUCCESS_API = 'SUCCESS_API';
export const ERROR = 'ERROR';

const requestCurrencies = (payload) => ({
  type: REQUEST_API,
  payload,
});

const successApi = (currencies) => ({
  type: SUCCESS_API,
  currencies,
});

const errorAppi = (error) => ({
  type: ERROR,
  error,
});

export function fetchCurrenciesApi() {
  return (dispatch) => {
    dispatch(requestCurrencies());
    return fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json())
      .then((currencies) => dispatch(successApi(currencies)),
        ((error) => dispatch(errorAppi(error))));
  };
}

export const SAVE_EXPENSE = 'SAVE_EXPENSE';
export function saveExpense(expense) {
  const fetchApi = 'https://economia.awesomeapi.com.br/json/all';
  return (dispatch) => {
    fetch(fetchApi).then((response) => response.json())
      .then((success) => dispatch({
        type: SAVE_EXPENSE,
        payload: { ...expense, exchangeRates: success },
      }));
  };
}
