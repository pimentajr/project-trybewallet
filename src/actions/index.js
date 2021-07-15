// Coloque aqui suas actions
export const LOGIN_USER = 'LOGIN_USER';
export const NEW_EXPENSE = 'NEW_EXPENSE';

export const userLogin = (email) => ({
  type: LOGIN_USER,
  user: {
    email,
  },
});
export const addNewExpense = (expense) => ({
  type: NEW_EXPENSE,
  expense,
});

export const fetchAPIExpenseAction = (expense) => async (dispatch) => {
  const URL = 'https://economia.awesomeapi.com.br/json/all';

  const fetchAPI = await fetch(URL);
  const parseJSON = await fetchAPI.json();

  dispatch(addNewExpense({
    ...expense,
    exchangeRate: parseJSON,
    exchangeRates: parseJSON,
  }));
};
