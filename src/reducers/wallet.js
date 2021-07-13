// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editMenu: false,
  objToChange: {},
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'GET_CURRENCIES':
    return { ...state, currencies: action.currencies,
    };

  case 'ADD_EXPENSE':
    return { ...state, expenses: [...state.expenses, action.details],
    };

  case 'DELETE_EXPENSE':
    return { ...state,
      expenses: state.expenses.filter((items) => action.id !== items.id),
    };

  case 'CHANGE_FORM':
    return { ...state,
      editMenu: action.bool,
      objToChange: state.expenses
        .find((items) => action.objToChange === items.id),
    };

  case 'CHANGE_EXPENSE':
    return { ...state,
      editMenu: action.bool,
      expenses: state.expenses
        .map((e) => (e.id === action.changedObj.id ? action.changedObj : e)),
      objToChange: {},
    };

  default:
    return { ...state };
  }
}

export default wallet;
