import React from 'react';
import { Route, Router } from 'react-router-dom';
import Login from './pages/Login';
import Wallet from './pages/Wallet';

function App() {
  return (
    <Router>
      <switch>
        <Route exact path="/" component={ Login } />
        <Route path="Wallet" component={ Wallet } />
      </switch>
    </Router>);
}

export default App;
