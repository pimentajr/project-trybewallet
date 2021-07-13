// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { REQUEST_VALUES, RECEIVE_VALUES } from '../actions/index';

const INITIAL_STATE = {
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
  default:
    return state;
  }
}
