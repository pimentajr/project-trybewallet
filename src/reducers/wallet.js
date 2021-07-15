import {
  REQUEST_COINS,
  REQUEST_COINS_SUCCESS,
  ADD_EXPENSES_SUCCESS,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  money: null,
};

function getTheCoins(state = INITIAL_STATE, action) {
  switch (action.type) {
  case REQUEST_COINS:
    return {
      ...state,
    };
  case REQUEST_COINS_SUCCESS:
    return {
      ...state,
      currencies: action.coins,
      money: action.coins,
    };
  case ADD_EXPENSES_SUCCESS:
    return {
      ...state,
      expenses: [...state.expenses, action.state],
    };
  default:
    return state;
  }
}

export default getTheCoins;
