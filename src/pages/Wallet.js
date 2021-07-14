import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import FormWallet from '../components/FormWallet';
import HeaderDesc from '../components/HeaderDesc';

class Wallet extends React.Component {
  constructor() {
    super();
    this.getValue = this.getValue.bind(this);
  }

  getValue() {
    const { stateLogin } = this.props;
    const { expenses } = stateLogin.wallet;
    let value = 0;

    expenses.forEach((e) => {
      const curr = e.currency;
      const valueSum = e.exchangeRates[curr].ask;
      value += Number(e.value * valueSum);
    });
    return value.toFixed(2);
  }

  render() {
    const { stateLogin } = this.props;
    const { email } = stateLogin.user;

    return (
      <header>
        <span data-testid="email-field">{ email }</span>
        <span data-testid="total-field">{ this.getValue() }</span>
        <span data-testid="header-currency-field">BRL</span>
        <FormWallet />
        <HeaderDesc />
      </header>
    );
  }
}

const mapStateProps = (state) => ({
  stateLogin: state,
});

export default connect(mapStateProps)(Wallet);

Wallet.propTypes = {
  stateLogin: PropTypes.objectOf(PropTypes.object).isRequired,
};
