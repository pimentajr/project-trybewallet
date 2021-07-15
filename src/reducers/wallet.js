const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

const FETCH_API = 'FETCH-API';
const ADD_EXPENSE = 'ADD_EXPENSE';
function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case FETCH_API:
    return {
      ...state,
      currencies: action.payload,
    };
  case ADD_EXPENSE:
    return {
      ...state,
      expenses: action.state,
    };
  default:
    return state;
  }
}

export default wallet;
