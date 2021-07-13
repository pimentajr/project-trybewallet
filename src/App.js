import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import Login from './pages/Login';
import Wallet from './pages/Wallet';
import store from './store';
// function App() {
//  return <div>Hello, TrybeWallet!</div>;
// }

class App extends React.Component {
  render() {
    return (
      <Provider store={ store }>
        <BrowserRouter>
          <div>Hello, TrybeWallet!</div>
          <Route exact path="/" component={ Login } />
          <Route exact path="/carteira" component={ Wallet } />
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
