import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import './App.css';
import Wallet from './pages/Wallet';

class App extends React.Component {
  render() {
    return (
      <div className="app-container">
        <Switch>
          <Route exact path="/" render={ () => <Login /> } />
          <Route exact path="/carteira" render={ () => <Wallet /> } />

        </Switch>
      </div>
    );
  }
}

export default App;
