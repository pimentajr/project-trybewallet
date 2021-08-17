// Esse reducer será responsável por tratar as informações da pessoa usuária

const INITIAL_STATE = {
  email: '',
};

const user = (state = INITIAL_STATE, action) => { // fica ouvindo todas as ações que são disparadas
  switch (action.type) {
  case 'LOGIN':
    return {
      email: action.payload,
    };

  default:
    return state;
  }
};

export default user;
