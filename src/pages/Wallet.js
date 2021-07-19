import React from 'react';
import Header from '../components/Header';
import Form from '../components/Form';
import Table from '../components/Table';

class Wallet extends React.Component {
  render() {
    return (
      <main>
        <h2>Trybe Wallet</h2>
        <Header />
        <Form />
        <Table />
      </main>);
  }
}

export default Wallet;
