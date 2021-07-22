import React from 'react';
import HeaderWallet from '../components/HeaderWallet';
import WalletForm from '../components/WalletForm';
import TableWallet from '../components/TableWallet';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <HeaderWallet />
        <WalletForm />
        <TableWallet />
      </div>
    );
  }
}

export default Wallet;
