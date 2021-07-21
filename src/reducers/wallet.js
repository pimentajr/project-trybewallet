import * as Types from '../actions/actionTypes';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  error: '',
  isLoading: false,
};

export default function walletReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case Types.REQUEST:
    return {
      ...state,
      isLoading: true,
    };
  case Types.GET_DATA:
    const allCurrencies = Object.keys(action.payload);
    const filteredCurrencies = allCurrencies.filter((currency) => currency !== 'USDT');
    return {
      ...state,
      isLoading: false,
      currencies: [...filteredCurrencies],
    };
  case Types.GET_RATES:
  return {
    ...state,
    isLoading: false,
    expenses: [...state.expenses, action.data],
  };
  case Types.REQUEST_ERROR:
    return {
      ...state,
      isLoading: false,
      error: action.payload,
    };
  default:
    return state;
  }
}
