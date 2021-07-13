// Coloque aqui suas actions
export const addEmail = (email) => ({
  type: 'SAVE_EMAIL',
  payload: email,
});

const saveExpense = (expenseObj) => ({
  type: 'SAVE_EXPENSE',
  payload: expenseObj,
});

export const getCurrencies = (obj) => async (dispatch) => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const currencies = await response.json();

  const expenseObj = obj;
  expenseObj.exchangeRates = currencies;

  dispatch(saveExpense(obj));
};
