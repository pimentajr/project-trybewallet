// Coloque aqui suas actions
export const SAVE_EMAIL = 'SAVE_EMAIL';
export const REQUEST_CURRENCIES = 'REQUEST_CURRENCIES';
export const RECEIVE_CURRENCIES = 'RECEIVE_CURRENCIES';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const REM_EXPENSE = 'REM_EXPENSE';
export const EDITOR_ON = 'EDITOR_ON';
export const EDITOR_OFF = 'EDITOR_OFF';
export const EDIT_DONE = 'EDIT_DONE';

const saveEmail = (email) => ({
  type: SAVE_EMAIL,
  email,
});

const fetchCurrenciesStart = () => ({
  type: REQUEST_CURRENCIES,
});

const fetchCurrenciesSuccess = (data) => ({
  type: RECEIVE_CURRENCIES,
  currencies: Object.keys(data).filter((currency) => currency !== 'USDT'),
});

const fetchCurrenciesToExpenses = (data) => ({
  type: ADD_EXPENSE,
  expenses: data,
});

const removeExpense = (id) => ({
  type: REM_EXPENSE,
  id,
});

const openEditor = (id) => ({
  type: EDITOR_ON,
  editID: id,
});

const closeEditor = () => ({
  type: EDITOR_OFF,
});

const editDone = (modified) => ({
  type: EDIT_DONE,
  modified,
});

export {
  saveEmail,
  fetchCurrenciesStart,
  fetchCurrenciesSuccess,
  fetchCurrenciesToExpenses,
  removeExpense,
  openEditor,
  closeEditor,
  editDone,
};

export function fetchCurrencies() {
  return (dispatch) => {
    dispatch(fetchCurrenciesStart());
    return fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json())
      .then((json) => dispatch(fetchCurrenciesSuccess(json)));
  };
}

export function fetchToExpenses(forms) {
  return (dispatch) => {
    dispatch(fetchCurrenciesStart());
    return fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json())
      .then((json) => dispatch(
        fetchCurrenciesToExpenses({ ...forms, exchangeRates: json }),
      ));
  };
}

export default saveEmail;
