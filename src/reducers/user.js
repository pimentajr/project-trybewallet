// Esse reducer será responsável por tratar as informações da pessoa usuária
const INITIAL_STATE = {
  user: {
    email: '',
    password: '',
  },
};

export default function user(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'VALIDATE_LOGIN':
    return {
      ...state,
      email: action.email,
      password: action.password,
    };
  default:
    return state;
  }
}
