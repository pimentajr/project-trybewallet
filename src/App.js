import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Wallet from './pages/Wallet';

function App() {
  return (
    <Switch>
      {/* requisito 01 */}
      <Route exact path="/" component={ Login } />
      {/* requisito 04 */}
      <Route path="/carteira" component={ Wallet } />
    </Switch>
  );
}

export default App;
