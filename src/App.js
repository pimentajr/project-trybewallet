import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Login from './pages/Login';
import Wallet from './pages/Wallet';

export default class App extends Component {
  renderRoutes() {
    return (
      <Switch>
        <Route
          exact
          path="/"
          render={ (props) => <Login { ...props } /> }
        />
        <Route
          exact
          path="/carteira"
          component={ Wallet }
        />
      </Switch>
    );
  }

  render() {
    return (
      <div>
        { this.renderRoutes() }
      </div>
    );
  }
}
