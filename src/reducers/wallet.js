// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { REQUEST_VALUES, RECEIVE_VALUES, NEW_EXPENSES } from '../actions/index';

const INITIAL_STATE = {
  id: 0,
  currencies: [],
  expenses: [],
  isFetching: false,
};

export default function reducerUser(state = INITIAL_STATE, action) {
  switch (action.type) {
  case REQUEST_VALUES:
    return ({
      ...state,
      isFetching: true,
    });
  case RECEIVE_VALUES:
    return ({
      ...state,
      isFetching: false,
      currencies: action.values,
    });
  case NEW_EXPENSES:
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
