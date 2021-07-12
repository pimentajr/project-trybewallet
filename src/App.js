import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Wallet from './pages/Wallet';

function App() {
  return (
    <div className="divApp">
      <h1>Hello, TrybeWallet!</h1>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/carteira" render={ (props) => <Wallet { ...props } /> } />
      </Switch>
    </div>
  );
}

export default App;
