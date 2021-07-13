// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { USER_INFO } from '../actions';

const initialState = { expense: '' };

const userReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
  case USER_INFO: {
    console.log('teste');
    return { ...state, email: payload };
  }
  default:
    return { ...state };
  }
};

export default userReducer;
