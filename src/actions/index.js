export const SET_USER = 'SET_USER';
export const SET_EXPENSE = 'SET_EXPENSE';
export const GET_CURRENCIES = 'GET_CURRENCIES';
export const GET_CURRENCIES_SUCCESS = 'GET_CURRENCIES_SUCCESS';
export const GET_CURRENCIES_FAIL = 'GET_CURRENCIES_FAIL';

export const setUser = (state) => ({
  type: SET_USER,
  state,
});

export const setExpense = (state) => ({
  type: SET_EXPENSE,
  state,
});

export const getCurrencies = () => ({
  type: GET_CURRENCIES,
});

export const getCurrenciesSuccess = (state) => ({
  type: GET_CURRENCIES_SUCCESS,
  state,
});

export const getCurrenciesFail = (state) => ({
  type: GET_CURRENCIES_FAIL,
  state,
});

export const getCurrenciesThunk = () => async (dispatch) => {
  dispatch(getCurrencies());
  try {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const results = await response.json();
    dispatch(getCurrenciesSuccess(results));
  } catch (error) {
    dispatch(getCurrenciesFail(error));
  }
};
