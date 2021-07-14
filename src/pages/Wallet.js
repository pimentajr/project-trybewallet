import React from 'react';
import FormWallet from './form/FormWallet';
import HeaderWallet from './HeaderWallet';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <HeaderWallet />
        <FormWallet />
      </div>

    );
  }
}

export default Wallet;
