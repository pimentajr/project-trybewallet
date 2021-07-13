const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  rates: null,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'REQUEST_CURRENCIES':
    return {
      ...state,
      currencies: action.payload,
      rates: action.payload,
    };
  case 'SEND_INFO':
    return {
      ...state,
      expenses: [...state.expenses, action.state],
    };
  case 'DELETE_EXPENSE':
    return {
      ...state,
      expenses: state.expenses.filter((item, index) => index !== action.payload),
    };
  default:
    return state;
  }
};

export default wallet;
