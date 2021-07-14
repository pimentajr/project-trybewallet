// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import {} from '../actions';

const WALLET_STATE = {
  currencies: [],
  expenses: [],
};

function functionWallet(state = WALLET_STATE, action) {
  switch (action.type) {
  case 'SUCESS_FETCH':
    return {
      ...state,
      currencies: Object.keys(action.payload),
    };
  case 'SUCESS_EXPENSES':
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };
  case 'REMOVE_EXPENSES':
    return {
      ...state,
      expenses: [...state.expenses.filter((e) => e.id !== action.payload)],
    };
  case 'EDIT_EXPENSES':
    return {
      ...state,
      expenses: [...state.expenses.filter((e) => e.id !== action.payload.id),
        action.payload,
      ].sort((a, b) => a.id - b.id),
    };
  default:
    return state;
  }
}

export default functionWallet;
