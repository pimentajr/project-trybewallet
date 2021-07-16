import React from 'react';
import { connect } from 'react-redux';
import WalletForm from './WalletForm';
import Header from './Header';

class Wallet extends React.Component {
  render() {
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
