// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

const INICIAL_STATE = {
  currencies: [],
  expenses: [],
};

function wallet(state = INICIAL_STATE, action) {
  switch (action.type) {
  case 'NEW_EXPENSES':
    return {
      ...state,
      expenses: [...state.expenses, action.expenses],
    };
  case 'REQUEST_API':
    return {
      ...state,
    };
  case 'GET_DATA':
    return {
      ...state,
      currencies: [action.data],
    };
  case 'REMOVE_EXPENSE':
    return {
      ...state,
      expenses: state.expenses.filter((a) => a.id !== action.expense),
    };
  default:
    return state;
  }
}

export default wallet;
