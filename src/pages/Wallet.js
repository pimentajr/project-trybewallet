import React from 'react';
import Header from '../components/Header';
import ExpenseForm from '../components/Form';
import ExpenseList from '../components/List';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <ExpenseForm />
        <ExpenseList />
      </div>
    );
  }
}

export default Wallet;
