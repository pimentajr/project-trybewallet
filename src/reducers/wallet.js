import { REQUEST_API_SUCCESS, REQUEST_API_ERROR } from '../actions';

const INITIAL_STATE = {
  coinsData: undefined,
  error: '',
};

function wallet(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
  case REQUEST_API_SUCCESS:
    return {
      ...state,
      coinsData: payload,
    };
  case REQUEST_API_ERROR:
    return {
      ...state,
      error: payload,
    };
  default:
    return state;
  }
}

export default wallet;
