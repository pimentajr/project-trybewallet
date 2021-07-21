import { CURRENCIES } from '../actions';

const INNITIAL_STATE = {
  currencies: [],
  expenses: [],
};

export default function wallet(state = INNITIAL_STATE, action) {
  switch (action.type) {
  case CURRENCIES:
    delete action.currencies.USDT;
    return {
      ...state,
      currencies: Object.keys(action.currencies),
    };
  default:
    return INNITIAL_STATE;
  }
}
