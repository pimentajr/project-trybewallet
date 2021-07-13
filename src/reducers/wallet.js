// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'ACTION_CURRENT':
    return { ...state, currencies: action.payload };
  case 'ACTION_EXPENSES':
    return {
      ...state,
      expenses: [
        ...state.expenses,
        { ...action.payload.expenses,
          exchangeRates: { ...action.payload.dataExchange },
        },
      ],
    };
  default:
    return state;
  }
};

export default wallet;
