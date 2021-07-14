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

export const addValues = (expense) => ({
  type: 'ADDVALUES',
  expense,
});

export const fetchAPI = () => async (dispatch) => {
  const results = await requestAPI();
  const keysValues = Object.keys(results);
  const excludeUSDT = keysValues.filter((allValues) => allValues !== 'USDT');
  dispatch(valuesWallet(excludeUSDT));
};

export const addExpense = (expense) => async (dispatch) => {
  const resultFetchAPI = await requestAPI();
  const actualExpense = {
    ...expense,
    exchangeRates: resultFetchAPI,
  };
  dispatch(addValues(actualExpense));
};
