import createReducer from '../utils/createReducer';

const initialState = {
  currencies: [],
  expenses: [],
  nextId: 0,
};
const actions = {
  receiveNewExpense: (nextState, expense) => {
    expense.id = nextState.nextId;
    expense.exchangeRates = nextState.currencies;
    nextState.expenses.push(expense);
    nextState.nextId += 1;
    return nextState;
  },
  receiveCurrencies: (nextState, currencies) => {
    nextState.currencies = currencies;
    return nextState;
  },
  deleteExpense: (nextState, id) => {
    nextState.expenses = nextState.expenses.filter((expense) => expense.id !== id);
    return nextState;
  },
  editExpense: (nextState, payload) => {
    nextState.expenses = nextState.expenses.map((expense) => {
      if (payload.id !== expense.id) return expense;

      return payload;
    });

    return nextState;
  },
};

export default createReducer(initialState, actions);
