// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  isLoading: false,
};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'REQUEST_CURRENCY':
    return { ...state, isLoading: true };
  case 'RECEIVED_CURRENCY':
    return {
      ...state,
      isLoading: false,
      currencies: Object.keys(action.currencies).filter((value) => value !== 'USDT'),
    };
  default:
    return { ...state };
  }
};

export default walletReducer;
