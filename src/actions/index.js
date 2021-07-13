// Coloque aqui suas actions
export const LOGIN = 'LOGIN';
export const REQUEST_API = 'REQUEST_API';
export const REQUEST_API_SUCCESS = 'REQUEST_API_SUCCESS';
export const SAVE_EXPENSES = 'SAVE_EXPENSES';

export const emailLogin = (payload) => ({
  type: LOGIN,
  payload,
});

export const requestApi = () => ({
  type: REQUEST_API,
});

export const requestApiSuccess = (data) => ({
  type: REQUEST_API_SUCCESS,
  data,
});

export const saveExpenses = (expense) => ({
  type: SAVE_EXPENSES,
  expense,
});

export const setExpense = (expense) => async (dispatch) => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const result = await response.json(response);
  dispatch(saveExpenses({ ...expense, exchangeRates: result }));
};

export const fetchApi = () => async (dispatch) => {
  dispatch(requestApi());
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const result = await response.json(response);
  dispatch(requestApiSuccess(Object.keys(result).filter((curr) => curr !== 'USDT')));
};
