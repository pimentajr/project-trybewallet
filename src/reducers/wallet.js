const DEFAULT_STATE = {
  currencies: [],
  expenses: [],
};

const walletReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
  case 'STORE_CURRENCIES':
    return {
      ...state,
      currencies:
        Object.values(action.currencies).filter(({ codein }) => codein !== 'BRLT') };
  default:
    return state;
  }
};

export default walletReducer;
