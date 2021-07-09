import { REQUEST_API_SUCCESS, REQUEST_API_ERROR, ADD_EXPENSE } from '../actions';

const INITIAL_STATE = {
  coinsData: undefined,
  error: '',
  total: 0,
  expenses: [],
  id: 0,
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
  case ADD_EXPENSE:
    return {
      ...state,
      expenses: [
        ...state.expenses,
        {
          id: state.id,
          ...payload,
          exchangeRates: state.coinsData,
        },
      ],
      id: state.id + 1,
      total: state.total
      + parseFloat(payload.value)
      * state.coinsData[payload.currency].ask,
    };
  default:
    return state;
  }
}

export default wallet;
