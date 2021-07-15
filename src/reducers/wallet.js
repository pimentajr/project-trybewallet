// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
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
};

export default createReducer(initialState, actions);
