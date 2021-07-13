const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

function user(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'action':
    return { ...state };
  default:
    return state;
  }
}

export default user;
