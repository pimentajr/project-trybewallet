// Coloque aqui suas actions
// setUsername
// SetPassword

export const SET_USERNAME = 'SET_USERNAME';
export const SET_PASSWORD = 'SET_PASSWORD';
export const GET_COTATION = 'GET_COTATION';
export const GET_COTATION_SUCCESS = 'GET_COTATION_SUCCESS';
export const GET_COTATION_FAILED = 'GET_COTATION_FAILED';
export const ADD_EXPENSE = 'ADD_EXPENSE';

export const setUsername = (payload) => ({
  type: SET_USERNAME,
  payload,
});

export const SetPassword = (payload) => ({
  type: SET_PASSWORD,
  payload,
});

export const getCotation = () => ({
  type: GET_COTATION,
});

export const getCotationSuccess = (payload) => ({
  type: GET_COTATION_SUCCESS,
  payload,
});

export const getCotationFailed = (payload) => ({
  type: GET_COTATION_FAILED,
  payload,
});

export const addExpenseAction = (payload, id) => ({
  type: ADD_EXPENSE,
  id,
  payload,
});

export const getCotationThunk = () => async (dispatch) => {
  dispatch(getCotation());
  try {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const results = await response.json();
    dispatch(getCotationSuccess(results));
  } catch (error) {
    dispatch(getCotationFailed(error));
  }
};
