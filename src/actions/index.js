export const LOGIN = 'LOGIN';
export const SUCCESS = 'SUCCESS';
export const REMOVE_DESCRIPTION = 'REMOVE_DESCRIPTION';
export const EDIT_EXPENSES = 'EDIT_EXPENSES';
export const UPDATE_EXPENSES = 'UPDATE_EXPENSES';
export const RESPONSE = 'RESPONSE';

export const login = (value) => ({
  type: LOGIN,
  value,
});

export const fetchSuccess = (response) => ({
  type: SUCCESS,
  response,
});

export const removeDescription = (payload) => ({
  type: REMOVE_DESCRIPTION,
  payload,
});

export const editExpenses = (payload) => ({
  type: EDIT_EXPENSES,
  payload,
});

export const updateExpenses = (payload) => ({
  type: UPDATE_EXPENSES,
  payload,
});

const responseApi = (state, payload) => ({
  type: RESPONSE,
  payload,
  state,
});

export const fetchApi = (state = false) => async (dispatch) => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const json = await response.json();
  return (!state ? dispatch(fetchSuccess(json)) : dispatch(responseApi(state, json)));
};
