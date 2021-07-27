import {
  GET_CURRENCY_WALLET_ACTION,
  GET_CURRENCY_WALLET_ACTION_ERROR,
  SEND_INFOS_TO_EXPENSES_ACTION,
  ERASE_DISPENSE_ACTION,
  ALLOW_EDIT_FORM_ACTION,
  EDIT_DISPENSE_ACTION,
  SEND_EDITATED_OBJECT_ACTION,
} from '../actions';

const INITIAL_STATE = {
  editForm: false,
  currency: 'BRL',
  currencies: [],
  error: '',
  expenses: [],
  editableObject: null,
};

function filterEditedPosition(expenses, position, expenseEdited) {
  return expenses.map((item, index) => {
    if (index === position) {
      return expenseEdited;
    }
    return item;
  });
}

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case GET_CURRENCY_WALLET_ACTION:
    return {
      ...state,
      currencies: action.payload.map((item) => item.code),
    };
  case GET_CURRENCY_WALLET_ACTION_ERROR:
    return {
      ...state,
      error: action.payload,
    };
  case SEND_INFOS_TO_EXPENSES_ACTION:
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };

  case ERASE_DISPENSE_ACTION:
    return {
      ...state,
      expenses: state.expenses.filter((item, index) => index !== action.index),
    };
  case ALLOW_EDIT_FORM_ACTION:
    return {
      ...state,
      editForm: action.trueOrFalse,
    };
  case EDIT_DISPENSE_ACTION:
    return {
      ...state,
      editableObject: action.editableObject,
    };

  case SEND_EDITATED_OBJECT_ACTION:
    return {
      ...state,
      expenses: filterEditedPosition(state.expenses, action.index, action.payload),
    };

  default:
    return state;
  }
}

export default wallet;

// Source: auxílio do colega Douglas e consulta ao repositório do Marcos
