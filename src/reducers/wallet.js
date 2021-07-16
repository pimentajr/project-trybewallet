// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  isLoading: false,
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'REQUEST_COIN':
    return {
      ...state,
      isLoading: true,
    };
  case 'REQUEST_COIN_SUCCESS':
    return {
      ...state,
      // acessa objeto da action - API e filtra dolar turismo USDT
      currencies: Object.keys(action.payload).filter((coin) => coin !== 'USDT'),
      isLoading: false,
    };
  case 'RESPONSE_PARAM':
    action.state.exchangeRates = action.payload;
    return {
      ...state,
      expenses: [...state.expenses, action.state],
    };
  default:
    return state;
  }
}

export default wallet;
