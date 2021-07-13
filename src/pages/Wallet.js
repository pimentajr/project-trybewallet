import React from 'react';
import Header from '../components/Header';
import AddExpenseForm from '../components/AddExpenseForm';
import ExpenseTable from '../components/ExpenseTable';

function Wallet() {
  return (
    <>
      <Header />
      <AddExpenseForm />
      <div>
        <ExpenseTable />
      </div>
    </>
  );
}

export default Wallet;
