export const LOGIN = 'LOGIN';
export const login = (email) => ({
  type: LOGIN,
  email });

export const REQUEST_ISS_MOEDA = 'REQUEST_ISS_MOEDA';
export const REQUEST_ISS_MOEDA_SUCCESS = 'REQUEST_ISS_MOEDA_SUCCESS';
export const REQUEST_ISS_MOEDA_ERROR = 'REQUEST_ISS_MOEDA_ERROR';
export const SAVEBUY = 'SAVEBUY';

const requestISSMoeda = (payload) => ({
  type: REQUEST_ISS_MOEDA,
  payload,
});

const requestISMoedaSuccess = (currencies) => ({
  type: REQUEST_ISS_MOEDA_SUCCESS,
  currencies,
});

const requestISMoedaError = (error) => ({
  type: REQUEST_ISS_MOEDA_ERROR,
  error,
});

export function fetchMoeda() {
  return (dispatch) => {
    dispatch(requestISSMoeda());
    return fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json())
      .then(
        (currencies) => dispatch(requestISMoedaSuccess(currencies)),
        (error) => dispatch(requestISMoedaError(error.message)),
      );
  };
}

export function fetchApi(expense) {
  return (dispatch) => {
    fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json())
      .then((success) => dispatch({
        type: SAVEBUY,
        payload: { ...expense, exchangeRates: success },
      }));
  };
}
