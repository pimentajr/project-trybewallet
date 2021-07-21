import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';

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
      </Switch>
    );
  }
}

export default App;
