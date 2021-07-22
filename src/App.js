import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import Login from './pages/Login';
import Wallet from './pages/Wallet';
import store from './store';
// desenvolvido com ajuda do code reviem feito com o pull request victor faria
// source https://github.com/tryber/sd-011-project-trybewallet/pull/7

function App() {
  return (
    <div>
      <Provider store={ store }>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={ Login } />
            <Route path="/carteira" component={ Wallet } />
          </Switch>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
