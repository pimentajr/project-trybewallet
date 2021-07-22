import React from 'react';
import AddExpenses from '../components/AddExpenses';
import Header from '../components/Header';
import ShowExpenses from '../components/ShowExpenses';

class Wallet extends React.Component {
  render() {
    return (
      <>
        <Header />
        <AddExpenses />
        <ShowExpenses />
      </>
    );
  }
}

export default Wallet;
