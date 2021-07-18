import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
// import { walletAPI } from '../actions';
import Header from '../components/Header';

class Wallet extends Component {
  render() {
    return (
      <div>
        TrybeWallet
        <Header />
      </div>
    );
  }
}

// Wallet.propTypes = {
//   userEmail: PropTypes.string.isRequired,
// };

// export default connect(mapStateToProps, null)(Wallet);
export default Wallet;
