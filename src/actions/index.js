// Coloque aqui suas actions
export const LOGIN = 'LOGIN';
export const loginAction = (email) => ({ type: LOGIN, email });

export const ADD_EXPENSE = 'ADD_EXPENSE';
export const addExpense = (expense) => ({
  type: ADD_EXPENSE,
  expense,
});

// Os elementos a seguir fora feitos com orietação de Douglas Santana Turma 11

const askFetch = async () => {
  const listExchange = await (await fetch('https://economia.awesomeapi.com.br/json/all')).json();
  delete listExchange.USDT;
  return listExchange;
};

export const fetchPrices = (expense) => async (dispatch) => {
  const askCurrency = await askFetch();
  const xpense = { ...expense, askCurrency };
  dispatch(addExpense(xpense));
};
