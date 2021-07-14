import api from '../helpers/ReturnApi';

export const SINGIN = 'SINGIN';
export function login(usuario) {
  return {
    type: SINGIN,
    email: usuario,
  };
}

export const ADD_CURRENCIES = 'ADD_CURRENCIES';
export function dispatchApi(result) {
  return {
    type: 'ADD_CURRENCIES',
    api: Object.keys(result),
  };
}

export function addCurrencies() {
  return (dispatch) => {
    api().then((result) => dispatch(dispatchApi(result)));
  };
}

export const ADD_EXPENSES = 'ADD_EXPENSES';
export function addExpenses(despesa) {
  return async (dispatch) => {
    const response = await api();
    dispatch({
      type: ADD_EXPENSES,
      expenses: { ...despesa, exchangeRates: response },
    });
  };
}
