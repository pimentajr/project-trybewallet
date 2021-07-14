const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

function userWallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'ADD_SPENT':
    return ({
      currencies: action.currencies,
      expenses: action.expenses,
    });
  case 'GET_CURRENCIES':
    return {
      ...state,
      currencies: action.payload,
    };
  case 'DEL_SPENT':
    return {
      ...state,
      expenses: [...state.expenses.filter(({ id }) => id !== action.id)],
    };
  default:
    return state;
  }
}

export default userWallet;
