import createAgent from '../utils/createAgent';

const BASE_URL = 'https://economia.awesomeapi.com.br/json/all';
export const login = createAgent('login');
const fetchCurrencies = () => new Promise((resolve) => {
  fetch(BASE_URL)
    .then((response) => response.json())
    .then(resolve);
});
const receiveCurrencies = createAgent('receiveCurrencies');
export const updateCurrencies = () => (dispatch) => fetchCurrencies()
  .then((currencies) => dispatch(receiveCurrencies(currencies)));
const receiveNewExpense = createAgent('receiveNewExpense');
export const addNewExpense = (expense) => (dispatch) => fetchCurrencies()
  .then((currencies) => {
    dispatch(receiveCurrencies(currencies));
    dispatch(receiveNewExpense(expense));
  });

export const deleteExpense = createAgent('deleteExpense');

export const editExpense = createAgent('editExpense');
