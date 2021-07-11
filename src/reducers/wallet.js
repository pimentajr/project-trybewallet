const DEFAULT_STATE = {
  currencies: {},
  expenses: [],
};

const walletReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
  case 1:
    return 1;
  default:
    return state;
  }
};

export default walletReducer;
