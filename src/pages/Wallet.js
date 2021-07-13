import React from 'react';

import Header from './Header';
import Category from '../components/Category';
import ExpenseAmount from '../components/ExpenseAmount';
import PaymentDescription from '../components/PaymentDescription';
import PaymentMethod from '../components/PaymentMethod';
import SelectedCurrency from '../components/SelectedCurrency';
import AddExpenses from '../components/AddExpenses';

function Wallet() {
  return (
    <div>
      <Header />
      <form>
        <ExpenseAmount />
        <PaymentDescription />
        <SelectedCurrency />
        <PaymentMethod />
        <Category />
      </form>
      <section>
        <AddExpenses />
      </section>
    </div>
  );
}

export default (Wallet);
