import { createStore } from 'redux';
import rootReducer from '../reducers';
// import { composeWithDevTools } from 'redux-devtools-extension';
// import thunk from 'redux-thunk';
// import reducer from '../reducers';

const store = createStore(rootReducer);
// composeWithDevTools(
//   applyMiddleware(thunk),
//

export default store;
