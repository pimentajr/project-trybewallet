// action types
export const USER_LOGIN = 'USER_LOGIN';
export const REQUEST_API = 'REQUEST_API';
export const RECEIVE_CURRENCIES = 'RECEIVE_CURRENCIES';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';
export const EDIT_EXPENSE_BTN = 'EDIT_EXPENSE_BTN';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';

// action creators
export const loginAction = (email, password) => ({
  type: USER_LOGIN,
  payload: { email, password },
});

export const requestApi = () => ({
  type: REQUEST_API,
});

export const receiveCurrencies = (payload) => ({
  type: RECEIVE_CURRENCIES,
  payload,
});

export function fetchApi() {
  return (dispatch) => {
    dispatch(requestApi());
    return fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json())
      .then((data) => dispatch(receiveCurrencies(data)))
      .catch((error) => console.log(error));
  };
}

// export function addExpense(data) {
//   return (dispatch) => {
//     dispatch(requestApi());
//     return fetch('https://economia.awesomeapi.com.br/json/all')
//       .then((response) => response.json())
//       .then((result) => dispatch({
//         type: ADD_EXPENSE,
//         state: { ...data, exchangeRates: result },
//       }));
//   };
// }

export const addExpense = (state) => ({
  type: ADD_EXPENSE,
  state,
});

export const deleteExpense = (payload) => ({
  type: DELETE_EXPENSE,
  payload,
});

export const enableEditExpense = (payload) => ({
  type: EDIT_EXPENSE_BTN,
  payload,
});

export const editExpense = (payload) => ({
  type: EDIT_EXPENSE,
  payload,
});

// Para o requisito bônus, contei com a ajuda de alguns colegas e do time Trybe.
