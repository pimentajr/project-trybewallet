import { WALLET } from '../actions';

const INITIAL_STATE = {
  value: 0,
};

export default function player(state = INITIAL_STATE, action) {
  switch (action.type) {
  case WALLET:
    return { ...state, value: action.value };
  default:
    return state;
  }
}
