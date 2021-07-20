import { ADD_EXPENSES, CURRENCIES } from '../actions/index';

const initialState = {
  currencies: [],
  expenses: [],
};

function wallet(state = initialState, action) {
  const { expenses: [exchangeRates] } = state;
  switch (action.type) {
  case CURRENCIES:
    return { ...state,
      currencies: Object.keys(action.payload),
      expenses: [{ exchangeRates: action.payload }] };
  case ADD_EXPENSES:
    return {
      ...state,
      expenses: [{ ...action.payload,
        ...exchangeRates }],
    };
  default:
    return state;
  }
}

export default wallet;
