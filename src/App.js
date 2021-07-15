import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Wallet from './pages/Wallet';

function App() {
  const loggedIn = useSelector((state) => state.loggedIn);
  return (
    <Switch>
      <Route path="/" component={ Login } exact>
        {loggedIn ? <Redirect to="/carteira" /> : null }
      </Route>
      <Route path="/carteira" component={ Wallet } />
    </Switch>
  );
}

export default App;
