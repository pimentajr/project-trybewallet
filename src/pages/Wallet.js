import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Form from '../components/Form';

class Wallet extends React.Component {
  render() {
    const { email, expenses } = this.props;
    const spent = expenses.reduce((acc, { exchangeRates, currency, value }) => (
      acc + (Number((exchangeRates[currency].ask * value)))
    ), 0);
    // console.log(email);
    return (
      <div>
        TrybeWallet
        <header>
          <span data-testid="email-field">{ email }</span>
          <p>
            <span data-testid="total-field">{ spent || 0 }</span>
          </p>
          <p>
            <span data-testid="header-currency-field">BRL</span>
          </p>
        </header>
        <Form />
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
  email: PropTypes.string,
}.isRequired;
