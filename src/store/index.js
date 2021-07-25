import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import myReducers from '../reducers';

const store = createStore(
  myReducers,
  composeWithDevTools(
    applyMiddleware(thunk),
  ),
);

export default store;
