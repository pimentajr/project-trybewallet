const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  isFetching: false,
  error: '',
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'REQUEST_CURR':
    return { ...state, isFetching: true };
  case 'NEW_EXPENSE':
    return {
      ...state,
      expenses: [...state.expenses, { ...action.state, exchangeRates: action.payload }],
      isFetching: false,
    };
  case 'FAILED_REQUEST':
    return { ...state, error: action.payload, isFetching: false };
  default:
    return state;
  }
}

export default wallet;
