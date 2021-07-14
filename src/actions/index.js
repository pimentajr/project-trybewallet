// Coloque aqui suas actions
import fetchCurrency from '../services/api';

export const LOGIN = 'LOGIN';
export const ADD_CURRENCY = 'ADD_CURRENCY';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const REMOVE_EXPENSE = 'REMOVE_EXPENSE';
export const EDIT_ON = 'EDIT_ON';
export const EDIT_OFF = 'EDIT_OFF';

export const actionLogin = (login) => ({
  type: LOGIN,
  payload: login,
});

export const getCurrency = (payload) => ({ type: ADD_CURRENCY, payload });

export const newExpense = (payload) => ({ type: ADD_EXPENSE, payload });

export const deleteExpense = (payload) => ({ type: REMOVE_EXPENSE, payload });

export const editExpense = (payload) => ({ type: EDIT_ON, payload });

export const finishEditExpense = (payload) => ({ type: EDIT_OFF, payload });

// export function fetchAPI() {
//   return (dispatch) => {
//     fetch('https://economia.awesomeapi.com.br/json/all')
//       .then((response) => response.json())
//       delete response.USDT
//       .then((data) => dispatch(getCurrency(data)));
//     // .catch((error) => dispatch(getError(error)));
//   };
// }

export function fetchAPI() {
  return (dispatch) => (
    fetchCurrency()
      .then((response) => dispatch(getCurrency((Object.values(response)))))
  );
}
