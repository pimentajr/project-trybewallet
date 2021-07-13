// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

import { USER_WALLET } from '../actions';

const INITIAL_STATE = {

};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case USER_WALLET:
    return {
      ...state,
    };
  default:
    return state;
  }
};

export default wallet;
