// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

const INITIAL_STATE = { currencies: [], countId: 0, expenses: [] };

const addNewExpenses = (state = INITIAL_STATE, action) => {
  const { countId, expenses } = state;
  const newExpense = {
    id: countId,
    ...action.expenses,
  };
  return {
    ...state,
    expenses: [
      ...expenses,
      newExpense,
    ],
    countId: countId + 1,
  };
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'VALUESWALLET':
    return {
      ...state,
      currencies: action.currencies,
    };
  case 'ADDVALUES':
    return addNewExpenses(state, action);
  default: {
    return state;
  }
  }
};

export default wallet;
