import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';

function App() {
  return (
    <div>
      {/* route to login page */}
      <Switch>
        <Route path="/" component={ Login } />
      </Switch>
    </div>
  );
}

export default App;
