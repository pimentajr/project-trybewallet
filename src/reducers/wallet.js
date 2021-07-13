// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  currencies: 'BRL',
  expenses: [],
};

function userWallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'ADD_SPENT':
    return ({
      currencies: action.currencies,
      expenses: action.expenses,
    });
  case 'DEL_SPENT':
    return {
      ...state,
      expenses: [...state.expenses.filter(({ id }) => id !== action.id)],
    };
  default:
    return state;
  }
}

export default userWallet;
