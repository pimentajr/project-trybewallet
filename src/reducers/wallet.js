const WALLET_INITIAL_STATE = {

  currencies: [],
  expenses: [],

};

const wallet = (state = WALLET_INITIAL_STATE, action) => {
  switch (action.type) {
  default:
    return { ...state };
  }
};

export default wallet;
