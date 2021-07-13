const INITIAL_STATE = {
  allCoins: [],
  id: 0,
  expenses: [],
  loading: false,

};

const stateCoins = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'REQUEST_COIN':
    return { ...state, loading: true };
  case 'RECEIVE_COIN':
    return { ...state, loading: false, allCoins: action.values };
  case 'ADD_EXPENSES':
    return ({
      ...state,
      id: state.id + 1,
      expenses: [...state.expenses,
        { id: action.id,
          ...action.payload,
          exchangeRates: state.allCoins,
        }],
    });
  case 'REMOVE_EXPENSES':
    return ({
      ...state,
      expenses: [...state.expenses.filter((item) => item.id !== action.id)],
    });
  default:
    return state;
  }
};

export default stateCoins;
