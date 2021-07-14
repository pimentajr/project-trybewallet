export const adicionaEmail = (payload) => ({
  type: 'ADICIONA_EMAIL',
  payload,
});

export const getCurrencies = (payload) => ({
  type: 'GET_CURRENCIES',
  payload,
});

export const testeExpencies = (payload) => ({
  type: 'TESTE_EXPENCIES',
  payload,
});

export const deleteRow = (payload) => ({
  type: 'DELETE_ROW',
  payload,
});

export const fetchCoins = () => (dispatch) => fetch('https://economia.awesomeapi.com.br/json/all')
  .then((result) => result.json())
  .then((data) => dispatch(getCurrencies(Object.keys(data))));

export const fetchExchangeRates = () => (dispatch) => fetch('https://economia.awesomeapi.com.br/json/all')
  .then((result) => result.json())
  .then((data) => dispatch(getCurrencies(data)));
