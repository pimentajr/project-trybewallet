export function saveEmail(email) {
  return ({
    type: 'SAVE_EMAIL',
    email,
  });
}

export function spending(currencies, expenses) {
  return ({
    type: 'ADD_SPENT',
    currencies,
    expenses,
  });
}

export const deleteExpense = (id) => ({
  type: 'DEL_SPENT',
  id,
});

export const requestCurrencies = (payload) => ({
  type: 'GET_CURRENCIES',
  payload,
});

export const fetchCurrencies = () => (dispatch) => fetch('https://economia.awesomeapi.com.br/json/all')
  .then((response) => response.json())
  .then((currencies) => dispatch(requestCurrencies(Object.values(currencies))));
