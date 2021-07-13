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
          <Route path="/" component={ Login } />
          <Route path="/wallet" component={ Wallet } />
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
