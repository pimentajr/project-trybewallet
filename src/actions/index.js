import * as actions from './actionTypes';

export function actionSetUser(email) {
  return {
    type: actions.SET_USER,
    payload: {
      email,
    },

  };
}

export function actionFetchCurrencies() {
  return {
    type: actions.FETCH_CURRENCY_QUOTATION,
  };
}
