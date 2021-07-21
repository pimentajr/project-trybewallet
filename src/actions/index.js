export const SET_USER = 'SET_USER';
export const REQUEST_CURRENCIES_API = 'REQUEST_CURRENCIES_API';
export const REQUEST_CURRENCIES_API_SUCCESS = 'REQUEST_CURRENCIES_API_SUCCESS';
export const REQUEST_CURRENCIES_API_ERROR = 'REQUEST_CURRENCIES_API_ERROR';
export const SET_EXCHANGE_RATES = 'SET_EXCHANGE_RATES';
export const SET_USER_DATA = 'SET_USER_DATA';
export const SET_TOTAL_EXPENSES = 'SET_TOTAL_EXPENSES';

export const setUser = (payload) => ({
  type: SET_USER,
  payload,
});

export const requestCurrenciesApi = (payload) => ({
  type: REQUEST_CURRENCIES_API,
  payload,
});

export const requestCurrenciesApiSuccess = (payload) => ({
  type: REQUEST_CURRENCIES_API_SUCCESS,
  payload,
});

export const requestCurrenciesApiError = (payload) => ({
  type: REQUEST_CURRENCIES_API_ERROR,
  payload,
});

export const setExchangeRates = (payload) => ({
  type: SET_EXCHANGE_RATES,
  payload,
});

export const setTotalExpenses = (payload) => ({
  type: SET_TOTAL_EXPENSES,
  payload,
});

export const setUserData = (payload) => ({
  type: SET_USER_DATA,
  payload: {
    id: payload.id,
    value: payload.value,
    description: payload.description,
    currency: payload.currency,
    method: payload.method,
    tag: payload.tag,
    exchangeRates: payload.exchangeRates,
  },
});

export const fetchApi = () => async (dispatch) => {
  const URL = 'https://economia.awesomeapi.com.br/json/all';
  dispatch(requestCurrenciesApi());

  try {
    const response = await fetch(URL);
    const data = await response.json();
    delete (data.USDT);

    dispatch(requestCurrenciesApiSuccess(data));
    dispatch(setExchangeRates(data));
  } catch (error) {
    dispatch(requestCurrenciesApiError(error));
  }
};
