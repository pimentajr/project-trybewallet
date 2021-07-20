// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { REQUEST_SUCCEED, ADD_EXPENSE } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  id: 0,
};
function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case REQUEST_SUCCEED:
    return { ...state, currencies: action.payload };
  case ADD_EXPENSE:
    return ({ ...state,
      id: state.id + 1,
      expenses: [...state.expenses, { id: action.id,
        ...action.payload,
        exchangeRates: state.currencies,
      }],
    });
  default:
    return state;
  }
}

export default wallet;
