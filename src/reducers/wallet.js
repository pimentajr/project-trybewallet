import { USER_COIN_SUCESS,
  USER_COIN_ERROR,
  ADD_USER_SPENDING,
  SET_COIN_ALL,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  error: '',
  expenses: [],
};

export default function user(state = INITIAL_STATE, action) {
  switch (action.type) {
  case USER_COIN_SUCESS:
    return { ...state, currencies: Object.keys(action.payload) };
  case USER_COIN_ERROR:
    return { ...state, error: 'Vazio' };
  case ADD_USER_SPENDING:
    return { ...state, expenses: [...state.expenses, action.payload] };
  case SET_COIN_ALL:
    return { ...state, exchangeRates: action.payload };
  default:
    return state;
  }
}
