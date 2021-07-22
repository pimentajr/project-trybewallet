import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Wallet from './pages/Wallet';

// ajuda https://github.com/tryber/sd-010-b-project-trybewallet/pull/23/files && https://github.com/tryber/sd-011-project-trybewallet/pull/18/files

function App() {
  return (
    <div>
      <Switch>
        <Route exact to path="/" component={ Login } />
        <Route to path="/carteira" component={ Wallet } />
      </Switch>
    </div>
  );
}

export default App;
