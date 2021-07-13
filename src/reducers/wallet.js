// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'SHOW_EMAIL':
    return {
      email: action.payload.email,
    };
  default:
    return state;
  }
};
export default userReducer;
