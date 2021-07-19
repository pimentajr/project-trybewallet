export const USER_INFO = 'USER_INFO';
export const CURRENCIES_VALUES = 'CURRENCIES_VALUES';
export const EXPENSES_VALUES = 'EXPENSES_VALUES';
export const REQUEST_CURRENCIES = 'REQUEST_CURRENCIES';
export const DELETA_DESPESA = 'DELETA_DESPESA';

export const userInfo = (email) => ({
  type: USER_INFO,
  payload: { email },
});

export const currenciesValues = (payload) => ({
  type: CURRENCIES_VALUES,
  payload,
});

export const expensesValues = (payload) => ({
  type: EXPENSES_VALUES,
  payload,
});

// https://github.com/reduxjs/redux-thunk
// Lógica construída com a ajuda do aluno Samuel Melo - Turma 11

const requestCurrencies = () => ({
  type: REQUEST_CURRENCIES,
});

export function fetchCurrency() {
  return (dispatch) => {
    dispatch(requestCurrencies());
    return fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json())
      .then(
        (currencies) => dispatch(currenciesValues(currencies)),
      );
  };
}

export const deletaDespesas = (id) => ({
  type: DELETA_DESPESA,
  payload: id,
});
