export const LOGIN = 'LOGIN';

export const getLogin = (email) => ({
  type: LOGIN,
  email,
});
