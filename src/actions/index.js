// Coloque aqui suas actions
export const NEW_EXPENSES = 'NEW_EXPENSES';
export const LOGIN = 'LOGIN';
export const REQUEST_API = 'REQUEST_API';
export const GET_DATA = 'GET_DATA';

export default function signUp(email) {
  return {
    type: LOGIN,
    email,
  };
}

export function newExpenses(expenses) {
  return {
    type: NEW_EXPENSES,
    expenses,
  };
}

export const getData = (data) => ({
  type: GET_DATA,
  data,
});

export const requestApi = () => ({
  type: REQUEST_API,
});

export function fetchApi() {
  return async (dispatch) => {
    dispatch(requestApi());
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();
    dispatch(getData(data));
  };
}
