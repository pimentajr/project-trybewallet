import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  constructor(props) {
    super(props);
    this.totalExpenses = this.totalExpenses.bind(this);
  }

  totalExpenses() {
    let total = 0;
    const { expenses } = this.props;

    expenses.forEach(({ value, currency, exchangeRates }) => {
      total += exchangeRates[currency].ask * value;
    });

    return total;
  }

  render() {
    const { userData } = this.props;
    return (
      <header>
        <h2 data-testid="email-field">{ userData || 'name'}</h2>
        <h2 data-testid="total-field">{ this.totalExpenses }</h2>
        <h2 data-testid="header-currency-field">BRL</h2>
      </header>
    );
  }
}
Header.propTypes = {
  userData: PropTypes.string,
}.isRequired;

const mapToStateProps = (state) => ({
  userData: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapToStateProps)(Header);
