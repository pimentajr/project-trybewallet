// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
// wallet: {
//   currencies: [],
//   expenses: [],
// }
const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  totalField: 0,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'SAVE_CURRENCIES_STATE':
    return {
      ...state,
      currencies: [action.payload],
    };

  case 'SAVE_EXPENSE':
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };
  case 'SUM_EXPENSE':
    return {
      ...state,
      totalField: state.totalField + action.payload,
    };
  default:
    return { ...state, totalField: 0 };
  }
};

export default wallet;
