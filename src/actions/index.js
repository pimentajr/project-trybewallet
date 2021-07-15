// Coloque aqui suas actions
export default function storeUserEmail(email, logged) {
  return {
    type: 'USER_EMAIL',
    payload: email,
    logged,
  };
}
