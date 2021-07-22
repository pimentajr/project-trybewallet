import { ADD_CURRENCIES } from '../actions';

const WALLET_INITIAL_STATE = {

  currencies: [],
  dispenses: [],

};

const wallet = (state = WALLET_INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_CURRENCIES:
    return { ...state, currencies: action.payload.currencies };
  default:
    return { ...state };
  }
};

export default wallet;
