import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import WalletForm from '../components/WalletForm';

class Wallet extends React.Component {
  render() {
    const { email, expenses } = this.props;
    const totalRates = expenses.length === 0 ? 0
      : expenses.reduce((acumulator, expense) => {
        const { value, currency, exchangeRates } = expense;
        return acumulator + parseFloat(value) * exchangeRates[currency].ask;
      }, 0);
    console.log(totalRates);
    return (
      <div>
        <header>
          <h1>TrybeWallet</h1>
          <div data-testid="email-field">{ email }</div>
          <div data-testid="total-field">{ totalRates }</div>
          <div data-testid="header-currency-field"> BRL </div>
        </header>
        <WalletForm />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Wallet);

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf.isRequired,
};
