// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { GET_CURRENCIES_SUCCESS,
  GET_CURRENCIES_ERROR,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case GET_CURRENCIES_SUCCESS:
    return {
      ...state,
      currencies: action.payload.filter((curr) => (curr !== 'USDT')),
    };
  case GET_CURRENCIES_ERROR:
    return {
      ...state,
      error: action.payload,
    };
  default:
    return state;
  }
} // Filter responsável por analisar as keys do Objeto recebido pelo fetch, e filtrar apenas as que nao são USDT.

export default wallet;
