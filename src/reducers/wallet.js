import {
  SUCCESS,
  UPDATE_EXPENSES,
  EDIT_EXPENSES,
  REMOVE_DESCRIPTION,
  RESPONSE,
} from '../actions';

// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SUCCESS:
    return { ...state,
      currencies: Object.keys(action.response).filter((coin) => coin !== 'USDT'),
    };
  case UPDATE_EXPENSES:
    return {
      ...state,
      expenses: state.expenses.map((value) => {
        if (value.id === action.payload.id) {
          return {
            id: value.id,
            ...action.payload,
            exchangeRates: value.exchangeRates,
          };
        } return value;
      }),
    };
  case EDIT_EXPENSES:
    return {
      ...state,
      funcEdit: action.payload,
    };
  case REMOVE_DESCRIPTION:
    return {
      ...state,
      expenses: state.expenses.filter(({ id }) => id !== action.payload),
    };
  case RESPONSE:
    action.state.exchangeRates = action.payload;
    return {
      ...state,
      expenses: [...state.expenses, action.state],
    };
  default:
    return state;
  }
}

export default wallet;
