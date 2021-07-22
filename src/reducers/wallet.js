// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { REQUEST_SUCCEED, ADD_EXPENSE, DELETE_EXPENSE } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case REQUEST_SUCCEED:
    return { ...state,
      currencies: action.payload.map((item) => item.code),
    };
  case ADD_EXPENSE:
    return { ...state,
      expenses: [...state.expenses,
        action.payload,
      ],
    };
  case DELETE_EXPENSE:
    return { ...state,
      expenses: state.expenses.filter((expense) => expense.id !== action.payload),
    };
  default:
    return state;
  }
}

export default wallet;
