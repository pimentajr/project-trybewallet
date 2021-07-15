// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INICIAL_STATE = {
  currencies: [],
  expenses: [],
};

function wallet(state = INICIAL_STATE, action) {
  switch (action.type) {
  case 'NEWEXPENSES':
    return {
      ...state,
      expenses: [...state.expenses, action.payload.expenses],
    };
  default:
    return state;
  }
}

export default wallet;
