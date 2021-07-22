// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'DELETE_EXPENSE':
    return {
      ...state,
      expenses: state.expenses
        .filter((expense) => expense.id !== action.id),
    };
  case 'SAVE_EXPENSES':
    return {
      ...state,
      expenses: [
        ...state.expenses,
        { ...action.payload, id: state.expenses.length },
      ] };
  default:
    return state;
  }
}

export default wallet;
