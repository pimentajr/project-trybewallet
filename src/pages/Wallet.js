import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import WalletForm from './WalletForm';

class Wallet extends React.Component {
  render() {
    const { emailUser } = this.props;
    return (
      <div className="wallet">
        <header>
          <h1 className="wallet">TrybeWallet</h1>
          <h1>TrybeWallet</h1>
          <h2 data-testid="email-field">
            Olá:
            { emailUser }
          </h2>
          <label htmlFor="expenses">
            Despesas:
            <input data-testid="total-field" type="number" value="0" />
            <input data-testid="header-currency-field" type="text" value="BRL" />
          </label>
        </header>
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
