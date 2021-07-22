export const addExpense = (expense) => ({
  type: 'SAVE_EXPENSES',
  payload: expense,
});

export const fetchAddExpense = (expense) => async (dispatch) => {
  const fetchApi = 'https://economia.awesomeapi.com.br/json/all';
  const response = await fetch(fetchApi);
  const exchangeRates = await response.json();
  dispatch(addExpense({ ...expense, exchangeRates }));
};
