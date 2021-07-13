export const REQ_CURRENCIES_GOOD = 'REQ_CURRENCIES_GOOD';
export const SEND_LOGIN = 'SEND_LOGIN';
export const REQ_CURRENCIES_GOOD_FORM = 'REQ_CURRENCIES_GOOD_FORM';

export const requestCurrenciesGood = (payload) => ({
  type: REQ_CURRENCIES_GOOD, payload });

export const sendLogin = (payload) => ({
  type: SEND_LOGIN, payload });

export const requestCurrenciesGoodForm = (payload) => ({
  type: REQ_CURRENCIES_GOOD_FORM, payload });
