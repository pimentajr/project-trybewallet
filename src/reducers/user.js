const DEFAULT_STATE = {
  email: '',
};

const userReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
  case 'STORE_USER_EMAIL':
    return { ...state, email: action.email };
  default:
    return state;
  }
};

export default userReducer;
