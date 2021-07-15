// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { REQUEST_COINS, REQUEST_SUCESS } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  loading: false,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_COINS:
    return {
      ...state,
      loading: true,
    };

  case REQUEST_SUCESS:
    return {
      ...state,
      currencies: Object.keys(action.payload).filter((item) => item !== 'USDT'),
      loading: false,
    };
  default: return state;
  }
};

export default wallet;
