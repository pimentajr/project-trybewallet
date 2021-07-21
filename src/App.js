import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Wallet from './pages/Wallet';

class App extends Component {
/*   constructor() {
    super();

    this.state = {
      user: {
        email: '',
      },
      wallet: {
        currencies: [],
        expenses: [],
      },
    };
  } */

  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/carteira" component={ Wallet } />
      </Switch>
    );
  }
}

export default App;
