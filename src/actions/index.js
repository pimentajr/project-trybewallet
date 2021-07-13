export const STORE_EMAIL = 'STORE_EMAIL';
export const RECEIVED_DATA = 'RECEIVED_DATA';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const ADD_EXCHANGERATES = 'ADD_EXCHANGERATES';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';

export const addEmail = (email) => ({ type: STORE_EMAIL, email });
export const getCurrencyData = (currencies) => ({ type: RECEIVED_DATA, currencies });
export const addExpenses = (payload) => ({ type: ADD_EXPENSE, payload });
export const getExchangeRates = (payload) => ({ type: ADD_EXCHANGERATES, payload });
export const deleteExpense = (payload) => ({ type: DELETE_EXPENSE, payload });

export const fetchCurrencies = () => (
  async (dispatch) => {
    try {
      const fetchResponse = await fetch('https://economia.awesomeapi.com.br/json/all');
      const currencies = await fetchResponse.json();
      return dispatch(getCurrencyData(currencies));
    } catch (error) {
      return console.log(error);
    }
  }
);

export const fetchExchangeRates = () => (
  async (dispatch) => {
    try {
      const fetchResponse = await fetch('https://economia.awesomeapi.com.br/json/all');
      const currencies = await fetchResponse.json();
      return dispatch(getExchangeRates(currencies));
    } catch (error) {
      return console.log(error);
    }
  }
);
