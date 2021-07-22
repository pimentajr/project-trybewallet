import React from 'react';
import AddExpenses from '../components/AddExpenses';
import Header from '../components/Header';

class Wallet extends React.Component {
  render() {
    return (
      <>
        <Header />
        <AddExpenses />
      </>
    );
  }
}

export default Wallet;
