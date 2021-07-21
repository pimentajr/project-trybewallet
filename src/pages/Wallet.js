import React from 'react';
import ExpensesForm from '../components/ExpensesForm';
import Header from '../components/Header';

class Wallet extends React.Component {
  render() {
    return (
      <div className="wallet-page">
        <Header />
        <ExpensesForm />
      </div>
    );
  }
}

export default Wallet;
