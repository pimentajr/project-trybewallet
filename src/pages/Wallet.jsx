import React from 'react';
import Header from '../components/Header';
import FormInput from '../components/FormInput';
import Table from '../components/Table';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        TrybeWallet
        <Header />
        <FormInput />
        <Table />
      </div>
    );
  }
}

export default Wallet;
