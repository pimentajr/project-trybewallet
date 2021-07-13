import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

const INITIAL_STATE = {
  user: {
    email: '',
  },
  wallet: {
    currencies: [],
    expenses: [],
    isFetching: false,
    error: '',
  },
};

const store = createStore(
  rootReducer,
  INITIAL_STATE,
  composeWithDevTools(
    applyMiddleware(thunk),
  ),
);

export default store;
