import receiveCurrencies from './receiveCurrencies';

const BASE_URL = 'https://economia.awesomeapi.com.br/json/all';

const fetchCurrencies = () => (dispatch) => fetch(BASE_URL)
  .then((response) => response.json())
  .then((currencies) => dispatch(receiveCurrencies(currencies)));

export default fetchCurrencies;
