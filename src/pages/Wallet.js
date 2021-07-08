import React from 'react';
import WalletHeader from '../components/WalletHeader';
import FormsWallet from '../components/FormsWallet';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <WalletHeader />
        <FormsWallet />
      </div>
    );
  }
}

export default Wallet;
