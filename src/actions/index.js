// Coloque aqui suas actions
export const LOGIN_USER = 'LOGIN_USER';
export const SHOW_EMAIL = 'SHOW_EMAIL';

export const userLogin = (email) => ({
  type: LOGIN_USER,
  user: {
    email,
  },
});

export const viewEmail = (email) => ({
  type: SHOW_EMAIL,
  user: {
    email,
  },
});
