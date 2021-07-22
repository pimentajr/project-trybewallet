import React from 'react';
import { Route } from 'react-router-dom';
import Login from './pages/Login';
import Wallet from './pages/Wallet';

// desenvolvido com ajuda do code reviem feito com o pull request victor faria
// source https://github.com/tryber/sd-011-project-trybewallet/pull/7

function App() {
  return (
    <div>
      {/* <Provider store={ store }>
        <BrowserRouter>
          <Switch>
            <Route path="/" exact render={ (props) => <Login { ...props } /> } />
            <Route exact path="/carteira" component={ Wallet } />
          </Switch>
        </BrowserRouter>
      </Provider> */}
      <div>
        <Route exact path="/" component={ Login } />
        <Route path="/carteira" component={ Wallet } />
      </div>
    </div>
  );
}

export default App;
