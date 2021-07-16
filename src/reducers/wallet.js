const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

const FETCH_API = 'FETCH-API';
const NEW_EXPENSE = 'NEW_EXPENSE';
function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case FETCH_API:
    return {
      ...state,
      currencies: action.payload,
    };
  case NEW_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.concat(action.expense),
    };
  default:
    return state;
  }
}

export default wallet;
