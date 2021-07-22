import React from 'react';
import Header from '../components/Header';
import FormAddExpenses from '../components/FormAddExpenses';
import TableExpenses from '../components/TableExpenses';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <FormAddExpenses />
        <TableExpenses />
      </div>
    );
  }
}

export default Wallet;
