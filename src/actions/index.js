// Coloque aqui suas actions
const NEWEXPENSES = 'NEWEXPENSES';
const LOGIN = 'LOGIN';

const signUp = (email) => ({
  type: LOGIN,
  payload: {
    email,
  },
});

export const newExpenses = (expenses) => ({
  type: NEWEXPENSES,
  payload: {
    expenses,
  },
});

export default signUp;
