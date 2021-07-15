// Esse reducer será responsável por tratar as informações da pessoa usuária

const INICIAL_STATE = {
  email: '',
};

function user(state = INICIAL_STATE, action) {
  switch (action.type) {
  case 'LOGIN':
    return {
      ...state,
      email: action.email,
    };
  default:
    return state;
  }
}

export default user;
