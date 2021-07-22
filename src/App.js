import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Wallet from './pages/Wallet';

// ajuda https://github.com/tryber/sd-010-b-project-trybewallet/pull/23/files && https://github.com/tryber/sd-011-project-trybewallet/pull/18/files

export default class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/carteira" component={ Wallet } />
      </Switch>
    );
  }
}
