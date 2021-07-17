import { storeCurrencies } from '../actions';
import store from '../store';

const fetchCurrencyList = async () => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const responseObject = await response.json();
  store.dispatch(storeCurrencies(responseObject));
  return responseObject;
};

export default fetchCurrencyList;
