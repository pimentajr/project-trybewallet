// Coloque aqui suas actions
export const ACTION_EMAIL = 'ACTION_EMAIL';
export const ACTION_CURRENT = 'ACTION_CURRENT';
export const ACTION_EXPENSES = 'ACTION_EXPENSES';

export const saveEmail = (payload) => ({
  type: ACTION_EMAIL,
  payload,
});

export const walletCurrent = (payload) => ({
  type: ACTION_CURRENT,
  payload,
});

export function fetchCurrentType() {
  return (dispatch) => fetch('https://economia.awesomeapi.com.br/json/all')
    .then((response) => response.json())
    .then((currencies) => dispatch(walletCurrent(currencies)));
}

export const walletExpenses = (expenses, dataExchange) => ({
  type: ACTION_EXPENSES,
  payload: {
    expenses,
    dataExchange,
  },
});

export const exchangeRates = () => (
  fetch('https://economia.awesomeapi.com.br/json/all')
    .then((response) => response.json())
);

export const newExpense = (expenses) => (dispatch) => (
  exchangeRates()
    .then((dataExchange) => {
      dispatch(walletExpenses(expenses, dataExchange));
    })
);
