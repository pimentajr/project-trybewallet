import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Wallet from './pages/Wallet';

function App() {
  return (
    <Switch>
      <Route path="/" exact render={ (props) => <Login { ...props } /> } />
      <Route path="/carteira" exact component={ Wallet } />
    </Switch>
  );
}

export default App;
