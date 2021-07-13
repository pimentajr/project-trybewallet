// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { GET_COTATION,
  GET_COTATION_SUCCESS,
  GET_COTATION_FAILED, ADD_EXPENSE } from '../actions';

const INITIAL_STATE = {
  id: 0,
  currencies: [],
  expenses: [],
};

function walletReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case GET_COTATION:
    return { ...state };
  case GET_COTATION_SUCCESS:
    return { ...state, currencies: action.payload };
  case GET_COTATION_FAILED:
    return { ...state, error: action.payload };
  case ADD_EXPENSE:
    return ({
      ...state,
      id: state.id + 1,
      expenses: [...state.expenses,
        { id: action.id,
          ...action.payload,
          exchangeRates: state.currencies,
        }],
    });
  default:
    return state;
  }
}

export default walletReducer;
