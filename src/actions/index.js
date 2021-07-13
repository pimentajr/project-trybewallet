// Coloque aqui suas actions
export const LOGIN = 'LOGIN';

export function login(payload) {
  return {
    type: LOGIN,
    payload,
  };
}
