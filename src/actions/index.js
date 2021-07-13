// // Coloque aqui suas actions
// export const SET_USERNAME = 'SET_USERNAME';

// export const setUserName = (payload) => ({
//     type: SET_USERNAME;

// })

export const SET_EMAIL = 'SET_EMAIL';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const CALCULATE_EXPENSES = 'CALCULATE_EXPENSES';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';
export const SAVE_EDITIONS = 'SAVE_EDITIONS';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';
export const SET_CURRENCY = 'SET_CURRENCY';
export const SET_EXCHANGES_RATES = 'SET_EXCHANGES_RATES';

export const setEmail = (payload) => ({
  type: SET_EMAIL,
  payload,
});

export const addExpense = (payload) => ({
  type: ADD_EXPENSE,
  payload,
});

export const calculateExpenses = (payload) => ({
  type: CALCULATE_EXPENSES,
  payload,
});

export const editExpenses = (payload) => ({
  type: EDIT_EXPENSE,
  payload,
});

export const saveEditions = (payload) => ({
  type: SAVE_EDITIONS,
  payload,
});

export const deleteExpense = (payload) => ({
  type: DELETE_EXPENSE,
  payload,
});

export const setCurrency = (payload) => ({
  type: SET_CURRENCY,
  payload,
});

export const setExchangesRates = (payload) => ({
  type: SET_EXCHANGES_RATES,
  payload,
});

export const fetchExchangesRatesApi = (expense) => (dispatch) => {
  fetch('https://economia.awesomeapi.com.br/json/all')
    .then((result) => result.json())
    .then((data) => {
      const newExpense = expense;
      newExpense.exchangeRates = data;
      dispatch(saveExpenseWallet(newExpense));
    })
    .catch((error) => console.log(error));
};
