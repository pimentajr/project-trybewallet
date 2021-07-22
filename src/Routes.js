import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Wallet from './pages/Wallet';
// conultei o PR do Fabio Lima pois não estava conseguindo solucionar um problema com as rotas
// source: https://github.com/tryber/sd-011-project-trybewallet/pull/171/files

class Routes extends React.Component {
  render() {
    return (
      <Switch>
        <Route path="/" exact render={ (props) => <Login { ...props } /> } />
        <Route exact path="/carteira" component={ Wallet } />
      </Switch>
    );
  }
}

export default Routes;
