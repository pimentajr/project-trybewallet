import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  constructor() {
    super();
    this.totalOfExpenses = this.totalOfExpenses.bind(this);
  }

  totalOfExpenses() {
    const { expenses } = this.props;
    const total = expenses.reduce((acc, curr) => {
      const numb = curr.exchangeRates[curr.currency].ask * Number.parseFloat(curr.value);
      return acc + numb;
    }, 0);
    return total;
  }

  render() {
    const { email, expenses } = this.props;
    return (
      <header>
        <h3 data-testid="email-field">{ email }</h3>
        <h3 data-testid="total-field">
          {expenses.length === 0 ? '0,00' : this.totalOfExpenses()}
        </h3>
        <h3 data-testid="header-currency-field">BRL</h3>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps)(Header);
