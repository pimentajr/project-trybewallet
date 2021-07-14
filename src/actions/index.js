export const SET_USEREMAIL = 'SET_USEREMAIL';
export const REQUEST_SUCCESS = 'REQUEST_SUCCESS';
export const SET_EXPENSES = 'SET_EXPENSES';

export const setUserEmail = (payload) => ({
  type: SET_USEREMAIL,
  payload,
});

const requestCurrenciesSuccess = (currencies) => ({
  type: REQUEST_SUCCESS,
  currencies,
});

export const getCurrenciesThunk = () => async (dispatch) => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const currencies = await response.json();

  dispatch(requestCurrenciesSuccess(currencies));
};

export const addExpenses = (payload) => ({
  type: SET_EXPENSES,
  payload,
});
