// Coloque aqui suas actions
export const LOGIN = 'LOGIN';
export const REQUEST = 'REQUEST';
export const SUCCESS = 'SUCCESS';
export const EXPENSES = 'EXPENSES';
export const DELETE = 'DELETE';

export const userLogin = (state) => ({
  type: LOGIN,
  state,
});

export const request = () => ({
  type: REQUEST,
});

export const success = (currencies) => ({
  type: SUCCESS,
  currencies,
});

export const fetchAPICurrencies = () => async (dispatch) => {
  dispatch(request());
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const result = await response.json(response);
  dispatch(success(Object.keys(result).filter((currency) => currency !== 'USDT')));
};

/* export const setExpenses = (expenses) => ({
  type: EXPENSES,
  expenses,
});

export const fetchExpenses = () => async (dispatch) => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const result = await response.json(response);
  dispatch(setExpenses(result));
}; */

export const sendExpenses = (expenses) => ({
  type: EXPENSES,
  expenses,
});

export const fetchExpenses = (expenses) => async (dispatch) => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const result = await response.json(response);
  dispatch(sendExpenses({ ...expenses, exchangeRates: result }));
};

/* export const sendExpenses = (expenses, payload) => ({
  type: EXPENSES,
  expenses,
  payload,
});

export const fetchApi = (expenses = false) => (dispatch) => {
  dispatch(request());
  return fetch('https://economia.awesomeapi.com.br/json/all')
    .then((response) => response.json())
    .then((result) => (expenses ? dispatch(sendExpenses(expenses, result))
      : dispatch(success(Object.keys(result).filter((currency) => currency !== 'USDT')))))
}; */

export const deleteExpenses = (id) => ({
  type: DELETE,
  id,
});
