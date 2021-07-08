// Coloque aqui suas actions
export const SET_EMAIL = 'SET_EMAIL';

const emailAssignment = (payload) => ({
  type: SET_EMAIL,
  payload,
});

export default emailAssignment;
