import React from 'react';
import WalletHeader from '../components/WalletHeader';
import FormsWallet from '../components/FormsWallet';
import WalletTable from '../components/WalletTable';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <WalletHeader />
        <FormsWallet />
        <WalletTable />
      </div>
    );
  }
}

export default Wallet;
