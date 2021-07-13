import fetchApi from '../services/CurrencyApi';

const LOGIN_ENTER_CLICK_ACTION = 'LOGIN_ENTER_CLICK_ACTION';
const GET_CURRENCY_WALLET_ACTION = 'GET_CURRENCY_WALLET_ACTION';
const GET_CURRENCY_WALLET_ACTION_ERROR = 'GET_CURRENCY_WALLET_ACTION_ERROR';
const SEND_INFOS_TO_EXPENSES_ACTION = 'SEND_INFOS_TO_EXPENSES_ACTION';
const ERASE_DISPENSE_ACTION = 'ERASE_DISPENSE_ACTION';
const EDIT_DISPENSE_ACTION = 'EDIT_DISPENSE_ACTION';
const ALLOW_EDIT_FORM_ACTION = 'ALLOW_EDIT_FORM_ACTION';
const RESET_EDITABLE_OBJ_ACTION = 'RESET_EDITABLE_OBJ_ACTION';
const SEND_EDITATED_OBJECT_ACTION = 'SEND_EDITATED_OBJECT_ACTION';

function loginEnterClickAction(payload) {
  return {
    type: LOGIN_ENTER_CLICK_ACTION,
    payload,
  };
}

function getCurrencyAction(payload) {
  return {
    type: GET_CURRENCY_WALLET_ACTION,
    payload,
  };
}

function getCurrencyActionError(payload) {
  return {
    type: GET_CURRENCY_WALLET_ACTION_ERROR,
    payload,
  };
}

function sendInfoToExpensesAction(payload) {
  return {
    type: SEND_INFOS_TO_EXPENSES_ACTION,
    payload,
  };
}

function eraseDispense(index) {
  return {
    type: ERASE_DISPENSE_ACTION,
    index,
  };
}

function editDispenseAction(editableObject) {
  return {
    type: EDIT_DISPENSE_ACTION,
    editableObject,
  };
}

function AllowEditFormAction(trueOrFalse) {
  return {
    type: ALLOW_EDIT_FORM_ACTION,
    trueOrFalse,
  };
}

function ResetEditableObjectAction() {
  return {
    type: RESET_EDITABLE_OBJ_ACTION,
  };
}

function SendEditatedObjectAction(index, payload) {
  return {
    type: SEND_EDITATED_OBJECT_ACTION,
    index,
    payload,
  };
}

function getCurrencyThunk() {
  return (dispatch) => (
    fetchApi()
      .then(
        (data) => dispatch(getCurrencyAction(Object.values(data))),
      )
      .catch(
        (error) => dispatch(getCurrencyActionError(error.message)),
      )
  );
}

export {
  loginEnterClickAction,
  LOGIN_ENTER_CLICK_ACTION,
  GET_CURRENCY_WALLET_ACTION,
  GET_CURRENCY_WALLET_ACTION_ERROR,
  getCurrencyAction,
  getCurrencyThunk,
  sendInfoToExpensesAction,
  SEND_INFOS_TO_EXPENSES_ACTION,
  ERASE_DISPENSE_ACTION,
  eraseDispense,
  EDIT_DISPENSE_ACTION,
  editDispenseAction,
  ALLOW_EDIT_FORM_ACTION,
  AllowEditFormAction,
  ResetEditableObjectAction,
  RESET_EDITABLE_OBJ_ACTION,
  SEND_EDITATED_OBJECT_ACTION,
  SendEditatedObjectAction,

};
