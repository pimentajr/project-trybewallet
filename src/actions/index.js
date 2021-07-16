export const GET_LOGIN = 'GET_LOGIN';

export const getLogin = (email) => ({
  type: GET_LOGIN,
  email,
});
