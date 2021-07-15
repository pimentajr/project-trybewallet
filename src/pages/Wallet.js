import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import WalletForm from './WalletForm';
import Header from './Header';

class Wallet extends React.Component {
  render() {
    const { emailUser } = this.props;
    return (
      <div className="wallet">
        <Header />
        <WalletForm />
      </div>
    );
  }
}
const mapStateToProps = (state) => ({ emailUser: state.user.email });
export default connect(mapStateToProps)(Wallet);
Wallet.propTypes = {
  emailUser: PropTypes.string.isRequired,
};
