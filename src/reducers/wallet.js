// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { ACTION_EXPENSES, REQUEST_COINS, REQUEST_SUCESS } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  loading: false,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_COINS:
    return {
      ...state,
      loading: true,
    };

  case REQUEST_SUCESS:
    return {
      ...state,
      currencies: action.payload,
      loading: false,
    };

  case ACTION_EXPENSES:
    return {
      ...state,
      expenses: [
        ...state.expenses,
        { ...action.payload.expenses,
          exchangeRates: { ...action.payload.dataExchange },
        },
      ],
    };

  default: return state;
  }
};

export default wallet;
