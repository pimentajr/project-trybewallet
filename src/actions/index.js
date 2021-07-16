// Coloque aqui suas actions
export const LOGIN = 'LOGIN';
export const REQUEST = 'REQUEST';
export const SUCCESS = 'SUCCESS';

export const userLogin = (state) => ({
  type: LOGIN,
  state,
});

export const request = () => ({
  type: REQUEST,
});

export const success = (payload) => ({
  type: SUCCESS,
  payload,
});

export const fetchAPI = () => async (dispatch) => {
  dispatch(request());
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const result = await response.json(response);
  dispatch(success(Object.keys(result).filter((currency) => currency !== 'USDT')));
};
