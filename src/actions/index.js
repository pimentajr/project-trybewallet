// Coloque aqui suas actions
import requestAPI from '../services/requestAPI';

export const newUser = (email) => ({
  type: 'TONEWUSER',
  email,
});

export const valuesWallet = (currencies) => ({
  type: 'VALUESWALLET',
  currencies,
});

export const addValues = (expenses) => ({
  type: 'ADDVALUES',
  expenses,
});

export const fetchAPI = () => async (dispatch) => {
  const results = await requestAPI();
  const keysValues = Object.keys(results);
  const excludeUSDT = keysValues.filter((allValues) => allValues !== 'USDT');
  dispatch(valuesWallet(excludeUSDT));
};

export const addExpense = (expenses) => async (dispatch) => {
  const resultFetchAPI = await requestAPI();
  const actualExpense = {
    ...expenses,
    exchangeRates: resultFetchAPI,
  };
  dispatch(addValues(actualExpense));
};
