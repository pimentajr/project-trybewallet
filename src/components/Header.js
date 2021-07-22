import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

class Header extends Component {
  render() {
    const { email, expensesArray } = this.props;
    let total = 0;
    expensesArray.forEach(({ value, exchangeRates, currency }) => {
      total += value * exchangeRates[currency].ask;
    });

    return (
      <div>
        <header data-testid="email-field">{ email }</header>
        <h4 data-testid="total-field">{ total }</h4>
        <h4 data-testid="header-currency-field">BRL</h4>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expensesArray: state.wallet.expenses,
});

Header.propTypes = {
  email: propTypes.string,
}.isRequired;

export default connect(mapStateToProps)(Header);
