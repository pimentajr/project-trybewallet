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
    // return { ...state,
    //   loading: false,
    //   allCoins: Object.values(action.values).filter((item) => item.codein !== 'BRLT'),
    // };
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
  default:
    return state;
  }
};

export default stateCoins;
