const INITIAL_STATE = {
  wallet: {
    currencies: [],
    expenses: [],
  },
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'ACTION':
    return state;
  default:
    return state;
  }
}

export default wallet;
