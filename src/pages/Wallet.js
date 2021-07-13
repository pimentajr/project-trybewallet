import React, { Component } from 'react';
import Header from '../component/Header';
import WalletComponent from '../component/WalletComponent';

export default class Wallet extends Component {
  render() {
    return (
      <div>
        <Header />
        <WalletComponent />
      </div>
    );
  }
}
