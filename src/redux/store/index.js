import thunk from 'redux-thunk';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
// import rootReducers from '../reducers/'

const store = createStore(rootReducers, composeWithDevTools(applyMiddleware(thunk)));

// Criação da store createStore(gaveta, extensãoDoBrowser(appIntermediario ->
// appIntermediario (applyMidWare) -> faz a store saber trabalhar com assincronicidade))
// englobra o thunk para acessar a store

export default store;
