// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { REQUEST_SUCCEED, ADD_EXPENSE } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  id: 0,
  loading: true,
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case REQUEST_SUCCEED:
    return { ...state, currencies: action.payload, id: -1, loading: false };
  case ADD_EXPENSE:
    return { ...state,
      loading: false,
      expenses: [{ ...state.expenses,
        id: state.id + 1,
        ...action.payload,
      }],
    };
  default:
    return state;
  }
}

export default wallet;
