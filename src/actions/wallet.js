export const REQUEST_CURRENCIES = 'REQUEST_CURRENCIES';
export const REQUEST_SUCCESS = 'REQUEST_SUCCESS';

const requestCurrencies = () => ({
  type: REQUEST_CURRENCIES,

});

const requestSuccess = (currencies) => ({
  type: REQUEST_SUCCESS,
  currencies,
});

export const fetchCurrencies = () => (dispatch) => {
  dispatch(requestCurrencies());
  return fetch('https://economia.awesomeapi.com.br/json/all')
    .then((result) => result.json())
    .then((currencies) => dispatch(requestSuccess(Object.values(currencies))));
};
