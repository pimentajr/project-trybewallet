// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

// import { REQ_CURRENCIES_GOOD } from '../actions/index';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  total: 0,
};

function walletReducer(state = INITIAL_STATE) {
//   switch (action.type) {
//   case REQ_CURRENCIES_GOOD:
//     return state;
//     // return { ...state, expenses: [...expenses, payload], total: total + payload.value };
//   default:
//     return state;
//   }
  return state; // provisorio
}
export default walletReducer;
