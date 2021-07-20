export const LOGIN = 'LOGIN';
export const WALLET = 'WALLET';

export const getLogin = (email) => ({
  type: LOGIN,
  email,
});

export const walletValue = (value) => ({
  type: WALLET,
  value,
});
