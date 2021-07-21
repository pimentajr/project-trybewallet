import {
  CURRENCY_NAMES,
  CURRENCY_REQUEST,
  EXPENSES,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  id: 0,
};

const wallet = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case CURRENCY_REQUEST:
    return { ...state };
  case CURRENCY_NAMES:
    return { ...state, currencies: payload };
  case EXPENSES:
    return (
      {
        ...state,
        expenses: [...state.expenses, { ...payload, id: state.id }],
        id: state.id + 1,
      }
    );
  default:
    return state;
  }
};

export default wallet;
