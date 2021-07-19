import {
  REQUEST_CURRENCIES,
  RECEIVED_CURRENCIES,
  NEW_DISPENSE,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  isLoading: true,
};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_CURRENCIES:
    return { ...state, isLoading: true };

  case RECEIVED_CURRENCIES:
    return { ...state, isLoading: false, currencies: action.payload };

  case NEW_DISPENSE:
    return { ...state, expenses: [...state.expenses, action.payload] };

  default:
    return state;
  }
};

export default walletReducer;
