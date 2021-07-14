// Esse reducer será responsável por tratar as informações da pessoa usuária
const USER_STATE = {
  email: '',
  id: -1,
};

function functionUser(state = USER_STATE, action) {
  switch (action.type) {
  case 'USER_LOGIN':
    return {
      ...state,
      email: action.payload,
    };
  case 'SEND_ID':
    return {
      ...state,
      id: action.payload,
    };
  default:
    return state;
  }
}

export default functionUser;
