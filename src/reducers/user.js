// Esse reducer será responsável por tratar as informações da pessoa usuária
const INITIAL_STATE = {
  user: {
    email: '',
  },
  //   wallet: {
  //     currencies: [],
  //     expenses: [],
  //   },
};

export default function user(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'ADD_EMAIL':
    return {
      ...state,
      email: action.email,
    };
  default:
    return {
      state,
    };
  }
}
