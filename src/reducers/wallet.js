// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { RECEIVED_DATA } from '../actions/index';

const WALLET_INITIAL_STATE = {
  currencies: [],
  // expenses: [
  //   {
  //     id: 0,
  //     expense: '',
  //     description: '',
  //     currency: '',
  //     exchangeRate: 0,
  //     paymentMethod: '',
  //     tag: '',
  //   },
  // ],
};

export default function wallet(state = WALLET_INITIAL_STATE, action) {
  switch (action.type) {
  case RECEIVED_DATA:
    return {
      ...state,
      currencies: Object.keys(action.currencies).filter((c) => c !== 'USDT'),
    };
  // case RECEIVED_EXPENSE:
  //   return {
  //     ...state,
  //     id: state + 1,
  //     expense: action.expense,
  //     description: description.description,
  //     currency: action.currency,
  //     paymentMethod: action.paymentMethod,
  //     tag: action.tag,
  //   };
  default:
    return state;
  }
}
