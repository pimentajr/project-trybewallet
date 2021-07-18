// Coloque aqui suas actions
const LOGIN = 'LOGIN';

export const walletLogin = (userEmail) => ({
  type: LOGIN,
  user: userEmail,
});

export const wallet = () => ({
  type: 'a',
});
