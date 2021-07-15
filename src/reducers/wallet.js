import { REQ_CURRENCIES_GOOD, ADD_TO_WALLET, ADD_TO_WALLET_TOTAL } from '../actions/index';

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

    // return { ...state,
    //   total: state.total + action.payload.valorConvertido,
    //   expenses: [...state.expenses, action.payload] };

    return { ...state,
      // total: state.total + action.payload.conv,
      expenses: [...state.expenses, action.payload] };

    // return { ...state, expenses: expenses.map((despesa) => ({
    // })), total: total + payload.valor };
    // localState.exchangeRates: { response };
    // return { ...state, expenses: [...expenses, localState, localState.exchangeRates: response ] };
  case ADD_TO_WALLET_TOTAL:
    return { ...state, total: state.total + action.payload };

  case REQ_CURRENCIES_GOOD:
    // return { ...state, currencies: [action.payload] };
    return { ...state, cotacoes: { ...action.payload } };
    // return { ...state, currencies: Object.keys(action.payload).filter((key) => key !== 'USDT')};
  default:
    return state;
  }

}
export default walletReducer;
