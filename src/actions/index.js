// Coloque aqui suas actions
function storeUserEmail(email, logged) {
  return {
    type: 'USER_EMAIL',
    payload: email,
    logged,
  };
}

export function storeCurrencies(payload) {
  return {
    type: 'CURRENCIES',
    payload,
  };
}

export default storeUserEmail;
