export const LOGIN = 'LOGIN';

export function getLogin(name, email) {
  return {
    type: LOGIN,
    name,
    email,
  };
}
