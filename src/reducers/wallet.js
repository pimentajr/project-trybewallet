// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
// Esse reducer será responsável por tratar as informações da pessoa usuária

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'GET_CURRENCY_TYPES':
    return { ...state, currencies: action.payload };
  case 'SAVE_EXPENSES':
    return {
      ...state,
      expenses: [
        ...state.expenses,
        { ...action.payload.expenses,
          exchangeRates: { ...action.payload.dataExchangeRates },
        },
      ],
    };
  case 'DEL_EXPENSE':
    return {
      ...state,
      expenses: state.expenses.filter(
        (expense) => action.payload !== expense.id,
      ),
    };
  default:
    return state;
  }
}

export default wallet;
