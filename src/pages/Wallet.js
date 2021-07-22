import React from 'react';
import ExpensesTable from '../components/ExpensesTable';
import Footer from '../components/Footer';
import Form from '../components/Form';
import Header from '../components/Header';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <Form />
        <ExpensesTable />
        <Footer />
      </div>);
  }
}

export default Wallet;
