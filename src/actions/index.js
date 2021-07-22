import currenciesApi from '../services/index';

export const EMAIL_TO_STATE = 'EMAIL_TO_STATE';
export const SEND_CURRENCIES = 'SEND_CURRENCIES';
export const SEND_EXPENSES = 'SEND_EXPENSES';
export const DEL_EXPENSE = 'DEL_EXPENSE';

export const emailToState = (email) => ({
  type: EMAIL_TO_STATE,
  email,
});

export const sendCurrencies = (currencies) => ({
  type: SEND_CURRENCIES,
  currencies,
});

export const sendExpenses = (expenses, data) => {
  const expensesValues = {
    ...expenses,
    exchangeRates: { ...data },
  };

  return ({
    type: SEND_EXPENSES,
    expensesValues,
  });
};

export const requestExpenses = (expenses) => (dispatch) => (
  currenciesApi()
    .then((response) => dispatch(sendExpenses(expenses, response)))
);

export const delExpense = (id) => ({
  type: DEL_EXPENSE,
  id,
});

