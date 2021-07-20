import React, { Component } from 'react';
import Header from '../components/Header';
import ExpenseForm from '../components/ExpenseForm';
import ExpensesTable from '../components/ExpensesTable';

class Wallet extends Component {
  render() {
    return (
      <div>
        <Header />
        <ExpenseForm />
        <ExpensesTable />
      </div>
    );
  }
}

export default Wallet;
