import React, { Component } from 'react';
import Table from '../components/Table';
import Header from '../components/Header';
import Expenses from '../components/ExpensesForm';

class Wallet extends Component {
  render() {
    return (
      <div>
        <Header />
        <Table />
        <Expenses />
      </div>
    );
  }
}

export default Wallet;
