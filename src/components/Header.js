import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
  constructor() {
    super();
    this.handleValue = this.handleValue.bind(this);
  }

  handleValue() {
    const { runExpenses } = this.props;
    return runExpenses.reduce((acc, cv) => {
      const { currency, exchangeRates, value } = cv;
      const valueConverted = value * exchangeRates[currency].ask;
      return acc + valueConverted;
    }, 0);
  }

  render() {
    const { userEmail } = this.props;
    return (
      <>
        <p data-testid="email-field">
          { userEmail }
        </p>
        <p data-testid="total-field">{this.handleValue().toFixed(2)}</p>
        <p data-testid="header-currency-field">BRL</p>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
  runExpenses: state.wallet.expenses,
});

Header.propTypes = {
  userEmail: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps)(Header);
