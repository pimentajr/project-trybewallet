// Coloque aqui suas actions
export const SET_EMAIL = 'SET_EMAIL';
export const REQUEST_SUCCEED = 'REQUEST_SUCCEED';
export const REQUEST_FAIL = 'REQUEST_FAIL';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const REQUEST_EXPENSE = 'REQUEST_EXPENSE';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';

export const setEmail = (email) => ({
  type: SET_EMAIL,
  payload: email,
});

// export const requestSuccess = (obj) => ({
//   type: REQUEST_SUCCEED,
//   payload: Object.keys(obj).filter((currency) => currency !== 'USDT'),
// });

export const requestSuccess = (payload) => ({
  type: REQUEST_SUCCEED,
  payload,
});

export const requestFailed = (error) => ({
  type: REQUEST_FAIL,
  payload: error,
});

export const addExpense = (payload) => ({
  type: ADD_EXPENSE,
  payload,
});

// export const requestExpense = () => ({
//   type: REQUEST_EXPENSE,
// });

export const deleteExpense = (id) => ({
  type: DELETE_EXPENSE,
  payload: id,
});

// export const fetchAPI = () => async (dispatch) => fetch('https://economia.awesomeapi.com.br/json/all')
//   .then((result) => result.json())
//   .then((data) => dispatch(requestSuccess(data)))
//   .catch((error) => dispatch(requestFailed(error)));

export const API = async () => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const results = await response.json();
  delete results.USDT;
  return results;
};

export const fetchAPI = () => async (dispatch) => (
  API().then((data) => dispatch(requestSuccess(Object.values(data))))
);
// export const addingExpense = (state) => (dispatch) => {
//   dispatch(requestExpense());
//   console.log('testando');
//   return fetch('https://economia.awesomeapi.com.br/json/all')
//     .then((result) => result.json())
//     .then((data) => {
//       const Object = {
//         state,
//         data,
//       };
//       dispatch(addExpenseSuccess(Object));
//     });
// };
