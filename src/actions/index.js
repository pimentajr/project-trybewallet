// Coloque aqui suas actions
const SET_USER_EMAIL = 'SET_USER_EMAIL';

function enviaEmailParaStore(email) {
  return {
    type: SET_USER_EMAIL,
    email,
  };
}

export {
  enviaEmailParaStore,
  SET_USER_EMAIL,
};
