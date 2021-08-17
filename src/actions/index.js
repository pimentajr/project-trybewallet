// Coloque aqui suas actions

export const login = (email) => ({
  type: 'LOGIN',
  payload: email,
});

export const addExpense = (expense) => ({
  type: 'ADD_EXPENSE',
  payload: expense,
});

const saveCurrencies = (currencies) => ({
  type: 'SAVE_CURRENCIES',
  payload: currencies,
});

export const getCurrencies = () => async (dispatch) => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const currencies = await response.json();
  dispatch(saveCurrencies(currencies)); // dispatch dispara ação
};
