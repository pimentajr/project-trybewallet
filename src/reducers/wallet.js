import { CURRENCIES } from '../actions';

const initialState = {
  wallet: {
    currencies: [],
    expenses: [],
  },
};

function wallet(state = initialState, action) {
  switch (action.type) {
  case CURRENCIES:
    return { ...state, currencies: Object.keys(action.payload) };
  default:
    return state;
  }
}

export default wallet;
