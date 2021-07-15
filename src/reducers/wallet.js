import { REQ_CURRENCIES_GOOD,
  ADD_TO_WALLET, ADD_TO_WALLET_TOTAL } from '../actions/index';

const INITIAL_STATE = {
  currencies: [],
  moedaConversao: 'Real brasileiro',
  valorConvertido: 0,
  expenses: [],
  total: 0,
  cotacoes: {},
};

function walletReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case ADD_TO_WALLET:
    return { ...state,
      expenses: [...state.expenses, action.payload] };
  case ADD_TO_WALLET_TOTAL:
    return { ...state, total: state.total + action.payload };
  case REQ_CURRENCIES_GOOD:
    return { ...state, cotacoes: { ...action.payload } };
  default:
    return state;
  }
}
export default walletReducer;
