// Coloque aqui suas actions
export const USER_DATA = 'USER_DATA';
export const LOADING = 'LOADING';

export const userData = (email) => ({
  type: 'USER_DATA',
  email,
});

export const loading = () => ({
  type: 'LOADING',
});

export const loadingSuccess = (json) => ({
  type: 'LOADING_SUCCESS',
  payload: json,
});

export const loadingError = (erro) => ({
  type: 'LOADING',
  payload: erro,
});

export function fetchResponses() {
  return (dispatch) => {
    dispatch(loading());
    return fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json)
      .then((responseJson) => dispatch(loadingSuccess(responseJson)))
      .catch((error) => dispatch(loadingError(error)));
  };
}
