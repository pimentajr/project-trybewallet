import {
  REQUEST_COINS,
  REQUEST_COINS_SUCCESS,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
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
    };
  default:
    return state;
  }
}

export default getTheCoins;
