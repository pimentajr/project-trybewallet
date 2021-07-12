import React from 'react';
import Header from '../components/Header';
import Expenses from '../components/Expenses';

class Wallet extends React.Component {
  render() {
    return (
      <>
        <Header />
        <Expenses />
        <div>TrybeWallet</div>
      </>
    );
  }
}

export default Wallet;
