import React from 'react';
import ExpenseForm from '../components/ExpenseForm';
import Header from '../components/Header';
import TableBody from '../components/TableBody';
import TableHeader from '../components/TableHeader';

class Wallet extends React.Component {
  render() {
    return (
      <main>
        <Header />
        <ExpenseForm />
        <table className="table">
          <TableHeader />
          <TableBody />
        </table>
      </main>
    );
  }
}

export default Wallet;
