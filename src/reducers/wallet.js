import { ADD_CURRENCIES, ADD_EXPENSES } from '../actions';

const WALLET_INITIAL_STATE = {

  currencies: [],
  expenses: [],

};

const wallet = (state = WALLET_INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_CURRENCIES:
    return { ...state, currencies: action.payload.currencies };
  case ADD_EXPENSES:
    return { ...state, expenses: [...state.expenses, action.payload] };
  default:
    return { ...state };
  }
};

export default wallet;
