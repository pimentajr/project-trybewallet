import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';

import Login from './pages/Login';
import Wallet from './pages/Wallet';

export const App = () => (
  <Switch>
    <Route exact path="/" component={ Login } />
    <Route path="/carteira" component={ Wallet } />
  </Switch>
);
// desta parte para baixo eu não sabia, fiz apartir de codigo de outros alunos
const mapStateToProps = () => ({

});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(App);
