import {
  CURRENCY_NAMES,
  CURRENCY_REQUEST,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
};

const wallet = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case CURRENCY_REQUEST:
    return { ...state };
  case CURRENCY_NAMES:
    return { ...state, currencies: payload };
  default:
    return state;
  }
};

export default wallet;
