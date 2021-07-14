export const LOGIN = 'LOGIN';
export const SUCCESS = 'SUCCESS';

export const login = (value) => ({
  type: LOGIN,
  value,
});

export const fetchSuccess = (response) => ({
  type: SUCCESS,
  response,
});

export const fetchApi = () => async (dispatch) => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const json = await response.json();
  return dispatch(fetchSuccess(json));
};
