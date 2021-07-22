import { CURRENCIES, EXPENSES, DELETE } from '../actions';

const INNITIAL_STATE = {
  currencies: [],
  expenses: [],
};

export default function wallet(state = INNITIAL_STATE, action) {
  let objectExpense = [];
  let newArrayOfExpenses = [];
  if (action.type === EXPENSES) {
    objectExpense = [
      ...state.expenses,
      {
        id: state.expenses.length > 0 ? state.expenses[state.expenses.length - 1].id + 1
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
  if (action.type === DELETE) {
    newArrayOfExpenses = state.expenses.filter((expense) => expense.id !== action.id);
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
  case DELETE:
    return {
      ...state,
      expenses: newArrayOfExpenses,
    };
  case EXPENSES:
    return {
      ...state,
      expenses: objectExpense,
    };
  default:
    return state;
  }
}
