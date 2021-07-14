import React from 'react';
import Forms from '../component/Forms';
import Header from '../component/Header';
import Table from '../component/Table';

class Wallet extends React.Component {
  render() {
    return (
      <>
        <Header />
        <Forms />
        <Table />
      </>
    );
  }
}

export default Wallet;
