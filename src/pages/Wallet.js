import React from 'react';
import Header from '../components/Header';
import FormExpenses from '../components/FormExpenses';
import Table from '../components/TableW';

class Wallet extends React.Component {
  render() {
    return (
      <>
        <Header />
        <FormExpenses />
        <Table />
      </>);
  }
}

export default Wallet;
