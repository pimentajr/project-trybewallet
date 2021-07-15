export const REQ_CURRENCIES_GOOD = 'REQ_CURRENCIES_GOOD';
export const SEND_LOGIN = 'SEND_LOGIN';
export const REQ_CURRENCIES_GOOD_FORM = 'REQ_CURRENCIES_GOOD_FORM';
export const ADD_TO_WALLET = 'ADD_TO_WALLET';
export const ADD_TO_WALLET_TOTAL = 'ADD_TO_WALLET_TOTAL';

export const sendLogin = (payload) => ({
  type: SEND_LOGIN, payload });

export const addToWalletTotal = (payload) => ({
  type: ADD_TO_WALLET_TOTAL, payload });

const requestCurrenciesGood = (payload) => ({
  type: REQ_CURRENCIES_GOOD, payload });

export const addToWallet = (payload) => ({
  type: ADD_TO_WALLET, payload });

export function fetchAndAddToWallet() {

  // return (dispatch) => {
  //   return fetch('https://economia.awesomeapi.com.br/json/all').then((res) => res.json())
  //     .then((payload) => {
  //       dispatch(requestCurrenciesGood(payload));
  //     });
  // };

  return (dispatch) => fetch('https://economia.awesomeapi.com.br/json/all').then((res) => res.json())
    .then((payload) => {
      dispatch(requestCurrenciesGood(payload));
    });
}
