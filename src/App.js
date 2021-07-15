import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';

class App extends Component {
  render() {
    return (
      <>
        <div>Hello, TrybeWallet!</div>
        <Switch>
          <Route exact path="/" component={ Login } />
        </Switch>
      </>
    );
  }
}

export default App;
