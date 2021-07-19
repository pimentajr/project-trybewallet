// Coloque aqui suas actions
const LOGIN = 'LOGIN';
const CURRENCIES = 'CURRENCIES';

export const walletLogin = (userEmail) => ({
  type: LOGIN,
  user: userEmail,
});

export const walletCurrencies = (currencies) => ({
  type: CURRENCIES,
  currencies,
});

export function fetchCurrencies() {
  const url = 'https://economia.awesomeapi.com.br/json/all';
  return (dispatch) => fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const keys = Object.keys(data);
      const rejectedCurrency = ['USDT', 'DOGE'];
      const currencies = keys.filter((currency) => !rejectedCurrency.includes(currency));
      dispatch(walletCurrencies(currencies));
    });
}
