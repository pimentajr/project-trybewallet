import React, { Component } from 'react';
import HeaderWallet from '../components/HeaderWallet';
import ExpenseFormWallet from '../components/ExpenseFormWallet';

export default class Wallet extends Component {
  render() {
    return (
      <section>
        <HeaderWallet />
        <ExpenseFormWallet />
      </section>
    );
  }
}
