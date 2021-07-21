// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { ADD_CURRENCY, ADD_EXPENSE, DELETE_EXPENSE } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_CURRENCY:
    return {
      ...state,
      currencies: [...state.currencies, action.currency],
    };
  case ADD_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, action.expense],
    };
  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: action.expenses,
    };
  default:
    return state;
  }
};

export default wallet;
