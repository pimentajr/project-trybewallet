const initialState = {
  email: null,
};

export default function user(state = initialState, action) {
  switch (action.type) {
  case 'USER_LOGIN':
    return {
      ...state,
      email: action.payload.email,
    };
  default:
    return state;
  }
}
