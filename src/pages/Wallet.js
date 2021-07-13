import React from 'react';
/* import { useSelector, useDispatch } from 'react-redux'; */
import HeaderWallet from '../components/HeaderWallet';
import ExpenseFormWallet from '../components/ExpenseFormWallet';

export default function Wallet() {
  return (
    <section>
      <HeaderWallet />
      <ExpenseFormWallet />
    </section>

  );
}
