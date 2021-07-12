// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  totalEx: 0,
};
function walletReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'ADD_EX':
    return state;
  default:
    return state;
  }
}

export default walletReducer;
