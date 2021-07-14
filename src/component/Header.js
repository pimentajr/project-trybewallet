import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  constructor(props) {
    super(props);
    this.totalExpense = this.totalExpense.bind(this);
  }

  totalExpense() {
    const { expenses } = this.props;
    const total = expenses.reduce((acc, element) => {
      const { value, currency, askCurrency } = element;
      const { ask } = Object.values(askCurrency).find(({ code }) => code === currency);
      return acc + (ask * value);
    }, 0);
    return total;
  }

  render() {
    const { email } = this.props;
    return (
      <header>
        <p data-testid="email-field">{ email }</p>
        <p data-testid="total-field">{ this.totalExpense() }</p>
        <p data-testid="header-currency-field">BRL</p>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
  // currencies: state.wallet.currencies,
});

Header.propTypes = {
  email: PropTypes.string,
  expenses: PropTypes.number,
  // currencies: PropTypes.number,
}.isRequired;

export default connect(mapStateToProps)(Header);
