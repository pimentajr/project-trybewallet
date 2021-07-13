import React from 'react';
import { connect } from 'react-redux';
import { setWallet } from '../actions/index';
import Header from '../components/Header';
import Form from '../components/Form';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <Form />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setWalletAction: (payload) => dispatch(setWallet(payload)),
});

export default connect(null, mapDispatchToProps)(Wallet);
