import getDataAPI from '../services/fetchAPI';

export const SET_LOGIN_EMAIL = 'SET_LOGIN_EMAIL';
export const SET_WALLET = 'SET_WALLET';
export const SEND_INFO_EXPENSE = 'SEND_INFO_EXPENSE';

export const loginEmail = (payload) => ({
  type: SET_LOGIN_EMAIL,
  payload,
});

export const walletAction = (payload) => ({
  type: SET_WALLET,
  payload,
});

export const sendInfoExpense = (payload) => ({
  type: SEND_INFO_EXPENSE,
  payload,
});

export function fetchExpense(obj) {
  return async (dispatch) => {
    const response = await getDataAPI();
    const newObj = { ...obj, exchangeRates: response };
    dispatch(sendInfoExpense(newObj));
  };
}
