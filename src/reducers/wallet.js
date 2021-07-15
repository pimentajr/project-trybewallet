// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

import { NEW_EXPENSE } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case NEW_EXPENSE:
    return {
      ...state,
      expenses: [
        ...state.expenses,
        action.expense,
      ],
    };
  default:
    return state;
  }
};
export default userReducer;
