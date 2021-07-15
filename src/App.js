import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Login, Wallet } from './pages';

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/wallet" component={ Wallet } />
      </Switch>
    );
  }
}

export default App;
