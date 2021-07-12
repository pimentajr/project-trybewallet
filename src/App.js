import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Wallet from './pages/Wallet';

function App() {
  return (
    <Switch>
      {/* (
      <div>
        Hello, TrybeWallet!
      </div>
      ) */}
      <Route exact path="/" component={ Login } />
      <Route path="/carteira" render={ (props) => <Wallet { ...props } /> } />
    </Switch>
  );
}

export default App;
