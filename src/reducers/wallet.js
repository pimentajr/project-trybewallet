import { CURRENCIES, EXPENSES } from '../actions';

const INNITIAL_STATE = {
  currencies: [],
  expenses: [],
};

export default function wallet(state = INNITIAL_STATE, action) {
  let objectExpense = [];
  if (action.type === EXPENSES) {
    objectExpense = [
      ...state.expenses,
      {
        id: state.expenses.length > 0
          ? state.expenses[state.expenses.length - 1].id + 1
          : 0,
        value: action.expenses[0],
        description: action.expenses[1],
        currency: action.expenses[2],
        method: action.expenses[3],
        tag: action.expenses[4],
        exchangeRates: {},
      },
    ];
  }
  switch (action.type) {
  case CURRENCIES:
    delete action.currencies.USDT;
    return {
      ...state,
      currencies: Object.keys(action.currencies),
      expenses: state.expenses.length > 0
        ? state.expenses.map(
          (expense) => ({ ...expense, exchangeRates: action.currencies }),
        )
        : [],
    };
  case EXPENSES:
    return {
      ...state,
      expenses: objectExpense,
    };
  default:
    return INNITIAL_STATE;
  }
}
