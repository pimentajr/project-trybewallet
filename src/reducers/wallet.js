const INITIAL_STATE = {
  loading: true,
  currencies: [],
  expenses: [],
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'LOADING_FETCH':
    return { ...state, loading: true };
  case 'ACCEPT_FETCH':
    return { ...state,
      loading: false,
      currencies: Object.keys(action.payload).filter((coin) => coin !== 'USDT'),
    };
  case 'SEND_EXPENSES':
    action.payload.exchangeRates = action.responseJson;
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };
  case 'DELETE_EXPENSE':
    return {
      ...state,
      expenses: [...state.expenses.filter(({ id }) => id !== action.id)],
    };
  case 'CHANGE_EXPENSE':
    return {
      ...state,
      expenses: [
        action.expense,
        ...state.expenses.filter(({ id }) => id !== action.expense.id),
      ],
    };
  default:
    return state;
  }
};

export default wallet;
