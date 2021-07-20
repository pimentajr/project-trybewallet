import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import * as pages from './pages/index';

import 'bootstrap/dist/css/bootstrap.min.css';
import './pages/styles/login.css';

export class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={ pages.Login } />
          <Route path="/carteira" component={ pages.Wallet } />
        </Switch>
      </div>
    );
  }
}

export default App;
