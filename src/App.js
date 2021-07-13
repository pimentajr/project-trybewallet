import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Login from './pages/Login';
import Wallet from './pages/Wallet';

function App() {
  return (
    <BrowserRouter>
      <div>Hello, TrybeWallet!</div>
      <Route exact path="/" component={ Login } />
      <Route path="/carteira" component={ Wallet } />
    </BrowserRouter>
  );
}

export default App;
