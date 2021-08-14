// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  wallet: {
    currencies: [],
    expenses: [],
  },
};

const wallet = (state = INITIAL_STATE, action) => { // fica ouvindo todas as ações que são disparadas
  switch (action.type) {
  case 'WALLET':
    return {
      wallet: {
        currencies: action.payload.currencies,
        expenses: action.payload.expenses,
      },
    };

  default:
    return state;
  }
};

export default wallet;
