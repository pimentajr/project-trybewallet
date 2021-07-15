export const REQUEST_API = 'REQUEST_API';
export const REQUEST_API_SUCESS = 'REQUEST_API_SUCESS';
export const REQUEST_API_ERROR = 'REQUEST_API_ERROR';
export const GET_EXPENSES = 'GET_EXPENSES';

export const requestApi = (payload) => ({
  type: REQUEST_API,
  payload,
});

export const requestApiSucess = (payload) => ({
  type: REQUEST_API_SUCESS,
  payload,
});

export const requestApiError = (payload) => ({
  type: REQUEST_API_ERROR,
  payload,
});

export function addExpansesAction(payload, id) {
  return ({
    type: GET_EXPENSES,
    id,
    payload,
  });
}

export const API = 'https://economia.awesomeapi.com.br/json/all';

export const fetchApi = () => (dispatch) => {
  dispatch(requestApi());
  return fetch(API)
    .then((result) => result.json())
    .then((test) => test)
    .then((data) => dispatch(requestApiSucess(data)))
    .catch((error) => dispatch(requestApiError(error)));
};
