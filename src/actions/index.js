// Coloque aqui suas actions
function actionEmail(email) {
  return {
    type: 'ADD_EMAIL',
    email,
  };
}

export default actionEmail;
