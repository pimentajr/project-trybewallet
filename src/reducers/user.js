const DEFAULT_STATE = {
  email: '',
};

const userReducer = (state = DEFAULT_STATE, action) => {
  switch (action) {
  case 1:
    return 1;
  default:
    return state;
  }
};

export default userReducer;
