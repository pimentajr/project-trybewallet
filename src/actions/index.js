// Coloque aqui suas actions
const LOGIN = 'LOGIN';
const CURRENCIES = 'CURRENCIES';
const COTATION = 'COTATION';

export const walletLogin = (userEmail) => ({
  type: LOGIN,
  user: userEmail,
});

export const walletCurrencies = (currencies) => ({
  type: CURRENCIES,
  payload: {
    currencies,
  },
});

export const atualCotation = (expenses) => ({
  type: COTATION,
  payload: {
    expenses,
  },
});

export function fetchCurrencies() {
  const url = 'https://economia.awesomeapi.com.br/json/all';
  return (dispatch) => fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const keys = Object.keys(data);
      const rejectedsCurrency = ['USDT', 'DOGE'];
      const currencies = keys.filter((currency) => !rejectedsCurrency.includes(currency));
      dispatch(walletCurrencies(currencies));
    });
}

export function fetchAtualCotation() {
  const url = 'https://economia.awesomeapi.com.br/json/all';
  return (dispatch) => fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const AllCurrencies = { ...data };
      const rejectedsCurrencies = ['USDT', 'DOGE'];
      rejectedsCurrencies.forEach((currency) => delete AllCurrencies[currency]);
      const exchangeRates = { ...AllCurrencies };
      console.log(exchangeRates);
      // dispatch(atualCotation(expenses));
    });
}
