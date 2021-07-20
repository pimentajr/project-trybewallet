import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Wallet from './pages/Wallet';
import './App.css';

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route path="/carteira" component={ Wallet } />
          <Route render={ (props) => <Login { ...props } /> } />
        </Switch>
      </div>
    );
  }
}
