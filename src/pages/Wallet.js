import React from 'react';
import Form from './Form';
import Header from './Header';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        TrybeWallet
        <Header />
        <Form />
      </div>
    );
  }
}

export default Wallet;
