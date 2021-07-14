// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

import {
  REQUEST_API,
  REQUEST_API_ERROR,
  REQUEST_API_SUCCESS,
  ADD_EXPENSE } from '../actions';

const INITIAL_STATE = {
  currencies: {},
  expenses: [],
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case REQUEST_API:
    return { ...state, isLoading: true };
  case REQUEST_API_SUCCESS:
    return { ...state, isLoading: false, currencies: action.payload };
  case REQUEST_API_ERROR:
    return { ...state, isLoading: false, error: action.payload };
  case ADD_EXPENSE:
    return { ...state, expenses: [...state.expenses, action.payload] };
  default:
    return state;
  }
}

export default wallet;
