// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import {} from '../actions';

const WALLET_STATE = {
  currencies: [],
  expenses: [],
};

function functionWallet(state = WALLET_STATE, action) {
  let idIndex = 0;
  switch (action.type) {
  case 'SUCESS_FETCH':
    return {
      ...state,
      currencies: action.payload,
    };
  case 'SUCESS_EXPENSES':
    for (let index = 0; index <= state.expenses.length; index += 1) {
      if (state.expenses[index] !== undefined) {
        idIndex = state.expenses[index].id + 1;
      }
    }
    return {
      ...state,
      expenses: [...state.expenses, {
        id: idIndex,
        ...action.payload,
      }],
    };
  case 'REMOVE_EXPENSES':
    console.log(action.payload);
    return {
      ...state,
      expenses: [...state.expenses.filter((e) => e.id !== action.payload)],
    };
  default:
    return state;
  }
}

export default functionWallet;
