import getAwesomeAPI from '../services/awesomeAPI';

export const WALLET_EXPENSES = 'WALLET_EXPENSES';
export const SEND_EXPENSES = 'SEND_EXPENSES';
export const getExpenses = (payload) => ({
  type: WALLET_EXPENSES,
  payload,
});

export const sendExpenses = (payload) => ({
  type: SEND_EXPENSES,
  payload,
});

export function fetchExpense(element) {
  return async (dispatch) => {
    const data = await getAwesomeAPI();
    const elements = { ...element, exchangeRates: data };
    dispatch(sendExpenses(elements));
  };
}
