const INITIAL_STATE = {
  user: '',
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'SAVE_EMAIL':
    return {
      ...state,
      user: action.payload,
    };
  default:
    return state;
  }
};

export default user;
