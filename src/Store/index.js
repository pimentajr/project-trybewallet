import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducers from '../Reducers';

const store = createStore(rootReducers, composeWithDevTools(applyMiddleware(thunk)));

export default store;