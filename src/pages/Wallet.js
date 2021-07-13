import React from 'react';
import { connect } from 'react-redux';
import { setWallet } from '../actions/index';

class Wallet extends React.Component {
  render() {
    return <div>TrybeWallet</div>;
  }
}

const mapDispatchToProps = (dispatch) => ({
  setWalletAction: (payload) => dispatch(setWallet(payload)),
});

export default connect(null, mapDispatchToProps)(Wallet);
