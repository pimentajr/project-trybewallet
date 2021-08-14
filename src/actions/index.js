// Coloque aqui suas actions

export const login = (email) => ({
  type: 'LOGIN',
  payload: email,
});

export const wallet = (cart) => ({
  type: 'WALLET',
  payload: {
    currencies: cart.currencies,
    expenses: cart.expenses,
  },
});
