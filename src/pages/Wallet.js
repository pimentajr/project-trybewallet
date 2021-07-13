import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Form from '../components/Form';

class Wallet extends React.Component {
  constructor() {
    super();
    this.totalCalc = this.totalCalc.bind(this);
  }

  totalCalc() {
    const { expenses } = this.props;
    let total = 0;
    expenses.forEach(({ value, currency, exchangeRates }) => {
      total += exchangeRates[currency].ask * value;
    });
    return (`Total: ${total.toFixed(2)}`);
  }

  render() {
    const { email } = this.props;
    return (
      <div>
        <header data-testid="email-field">
          <h1>TrybeWallet</h1>
          <h3>{email}</h3>
        </header>
        <div data-testid="total-field">
          { this.totalCalc() }
        </div>
        <div data-testid="header-currency-field">
          Câmbio: BRL
        </div>
        <Form />
      </div>

    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  password: state.user.password,
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf.isRequired,
};

export default connect(mapStateToProps)(Wallet);
