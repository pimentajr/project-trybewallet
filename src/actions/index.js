// Coloque aqui suas actions
export const loginAction = (email) => ({ type: 'VALIDATE_LOGIN', email });

export const expenseAction = (state) => ({ type: 'ADD_EXPENSE', state });
