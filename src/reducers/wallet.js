import {
  REQUEST_API_SUCCESS,
  REQUEST_API_ERROR,
  ADD_EXPENSE,
  DELETE_EXPENSE,
} from '../actions';

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
  case ADD_EXPENSE: {
    const totalAdd = parseFloat((state.total
    + parseFloat(payload.value)
    * state.coinsData[payload.currency].ask).toFixed(2));
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
      total: totalAdd,
    };
  }
  case DELETE_EXPENSE: {
    const updatedExpenses = state.expenses.filter((expense) => (
      expense.id !== payload.id
    ));

    return {
      ...state,
      expenses: updatedExpenses,
      total: payload.totValue,
    };
  }
  default:
    return state;
  }
}

export default wallet;
