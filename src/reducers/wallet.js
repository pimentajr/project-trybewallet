/* import { REQUEST_SUCESS, SAVE_EXPENSES } from '../actions';

const initialState = {
  currencies: [],
  expenses: [],
};

const walletReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
  case REQUEST_SUCESS: {
    return { ...state, currencies: payload };
  }
  case SAVE_EXPENSES: {
    return { ...state, expenses: [...expenses, payload] };
  }
  default: {
    return { ...state };
  }
  }
};

export default walletReducer;
 */
