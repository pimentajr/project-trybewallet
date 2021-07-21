import React from 'react';
import Header from '../components/Header';
import DispensesForm from '../components/DispensesForm';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <DispensesForm />
        <h1>TrybeWallet</h1>
      </div>
    );
  }
}

export default Wallet;
