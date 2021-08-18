import { RECEIVE_API, RECEIVE_NEW_ITEM, UPDATE_TOTAL, REMOVE_ITEM } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  total: 0,
};

const updateEmail = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case RECEIVE_API:
    return {
      ...state,
      currencies: action.state,
    };
  case RECEIVE_NEW_ITEM:
    return {
      ...state,
      expenses: [...state.expenses, action.state],
    };
  case UPDATE_TOTAL:
    return {
      ...state,
      total: action.state,
    };
  case REMOVE_ITEM:
    return {
      ...state,
      expenses: [...action.state],
    };
  default:
    return state;
  }
};

export default updateEmail;
