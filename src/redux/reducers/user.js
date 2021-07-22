const INITIAL_STATE = {
  email: '',
  password: '',
};

function user(state = INITIAL_STATE, action) {
  if (action.type) {
    return state;
  }
}

export default user;
