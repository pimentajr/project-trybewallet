// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { SUCCESS_FETCH } from '../actions';

const INITIAL_STATE = {
  coin: [],
};

function fetchAPI(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SUCCESS_FETCH:
    return { ...state, coin: action.coin };
  default:
    return state;
  }
}

export default fetchAPI;
