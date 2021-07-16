// Esse reducer será responsável por tratar as informações da pessoa usuária
const INITIAL_STATE = {
  email: '',
  password: '',
};

function handleLoginEmail(state, action) {
  state.email = action.email;
  return { ...state };
}

function handlePasswordEmail(state, action) {
  state.password = action.password;
  // é necessario reconstruir o estado para que o objeto retornado tenha um
  // endereço diferente.(state != {...state}), caso contrario o redux não detecta a mudança no estado.
  return { ...state };
  // return state; O React não detecta a mudança no estado se o estado não for refeito, o return state
  // retorna o mesmo objeto e portanto o react não consegue atualizar o estado.
  // Com o return { ...state }; isso não ocorre pois o estado é refeito e o react identifica a alteração.
}

export default function user(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'LOGIN_EMAIL':
    return handleLoginEmail(state, action);
  case 'LOGIN_PASSWORD':
    return handlePasswordEmail(state, action);
  default:
    return state;
  }
}
