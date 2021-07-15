// Coloque aqui suas actions
export const LOGIN = 'LOGIN';
export const SAVE_EMAIL = 'SAVE_EMAIL';
export const DEFAULT_ACTION = 'DEFAULT_ACTION';

export const login = (email) => ({
  type: LOGIN,
  email,
});
