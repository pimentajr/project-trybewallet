import React from 'react';
import Header from '../Components/Header';
import NewExpense from '../Components/NewExpense';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        TrybeWallet
        <Header />
        <NewExpense />
      </div>);
  }
}

export default Wallet;
