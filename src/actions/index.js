export const LOGIN = 'LOGIN';
export const FETCH_STARTED = 'FETCH_STARTED';
export const FETCH_SUCCESS = 'FETCH_SUCCESS';
export const FETCH_ERROR = 'FETCH_ERROR';
export const ADD_TO_EXPENSES = 'ADD_TO_EXPENSES';

export const login = (payload) => ({
  type: LOGIN,
  payload,
});

export const addToExpenses = (payload) => ({
  type: ADD_TO_EXPENSES,
  payload,
});

const fetchStarted = () => ({
  type: FETCH_STARTED });

const fetchSuccess = (payload) => ({
  type: FETCH_SUCCESS,
  payload,
});

const fetchError = (payload) => ({
  type: FETCH_ERROR,
  payload,
});

export const fetchCurrencies = () => async (dispatch) => {
  try {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();
    return dispatch(fetchSuccess(data));
  } catch (error) {
    dispatch(fetchError(error.message));
  }
};

export const fetchRates = (object) => async (dispatch) => {
  try {
    dispatch(fetchStarted());
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();
    object.exchangeRates = data;
    return dispatch(addToExpenses(object));
  } catch (error) {
    dispatch(fetchError(error.message));
  }
};
