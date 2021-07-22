import {
/*   FETCH_COIN_SUCCEEDED,
  FETCH_COIN_FAILED, */
  FETCHING_CURRENCY,
  ADD_EXPENSE,
  REMOVE_EXPENSE,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  /*   currency: [], */
  expenses: [],
  id: 0,
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  /*   case FETCH_COIN_SUCCEEDED:
    return { ...state, currency: action.payload }; */
  case FETCHING_CURRENCY:
    return { ...state, currencies: action.payload };
    /*   case FETCH_COIN_FAILED:
    return { ...state, error: action.payload }; */
  case ADD_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, { id: state.id, ...action.payload }],
      id: state.id + 1,
    };
  case REMOVE_EXPENSE:
    return {
      ...state,
      expenses: [
        ...state.expenses.filter((item) => item.id !== parseInt(action.payload, 10)),
      ],
    };

  default:
    return state;
  }
}

export default wallet;
