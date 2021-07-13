export const LOGIN_USER = 'LOGIN_USER';
export const REQUEST_CURRENCIES_SUCCESS = 'REQUEST_CURRENCIES_SUCCESS';
export const REQUEST_CURRENCIES_FAILED = 'REQUEST_CURRENCIES_FAILED';
export const SAVE_EXPENSES_SUCCESS = 'SAVE_EXPENSES_SUCCESS';
export const SAVE_EXPENSES_FAILED = 'SAVE_EXPENSES_FAILED';

export const logEmail = (payload) => ({
  type: LOGIN_USER,
  payload,
});

export const requestCurrenciesSuccess = (payload) => ({
  type: REQUEST_CURRENCIES_SUCCESS,
  payload,
});

export const requestCurrenciesFailed = (payload) => ({
  type: REQUEST_CURRENCIES_FAILED,
  payload,
});

export const fetchCurr = () => (dispatch) => fetch('https://economia.awesomeapi.com.br/json/all')
  .then((result) => result.json())
  .then((data) => dispatch(requestCurrenciesSuccess(data)))
  .catch((fail) => dispatch(requestCurrenciesFailed(fail)));

export const saveExpensesSuccess = (payload) => ({
  type: SAVE_EXPENSES_SUCCESS,
  payload,
});

export const saveExpensesFailed = (payload) => ({
  type: SAVE_EXPENSES_FAILED,
  payload,
});

export const saveExpense = (state) => (dispatch) => {
  fetch('https://economia.awesomeapi.com.br/json/all')
    .then((result) => result.json())
    .then((data) => {
      const object = {
        ...state,
        exchangeRates: data,
      };
      console.log(object);
      dispatch(saveExpensesSuccess(object));
    }).catch((error) => dispatch(saveExpensesFailed(error)));
};
