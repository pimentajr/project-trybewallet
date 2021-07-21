// Coloque aqui suas actions
export const USER_DATA = 'USER_DATA';
export const SUCCESS_FETCH = 'SUCCESS_FETCH';

export const userData = (email) => ({
  type: 'USER_DATA',
  email,
});

export const successFetch = (coin) => ({
  type: 'SUCCESS_FETCH',
  coin,
});
