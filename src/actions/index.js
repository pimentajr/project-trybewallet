import getCoinsAPI from '../services/apiCoins';

export const SET_EMAIL = 'SET_EMAIL';
export const REQUEST_API_SUCCESS = 'REQUEST_API_SUCCESS';
export const REQUEST_API_ERROR = 'REQUEST_API_ERROR';

export const emailAssignment = (payload) => ({
  type: SET_EMAIL,
  payload,
});

export const requestApiSuccess = (payload) => ({
  type: REQUEST_API_SUCCESS,
  payload,
});

export const requestApiError = (payload) => ({
  type: REQUEST_API_ERROR,
  payload,
});

export function fetchCoinsAPI() {
  return (dispatch) => getCoinsAPI().then(
    (data) => dispatch(requestApiSuccess(data)),
    ({ message }) => dispatch(requestApiError(message)),
  );
}
