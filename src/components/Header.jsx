import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { email, expenses } = this.props;
    return (
      <div>
        <p data-testid="email-field">{ email }</p>
        <p data-testid="total-field">
          { expenses ? expenses.reduce((acc, currentExpense) => acc
      + (currentExpense.value * currentExpense.exchangeRates[currentExpense.currency]
        .ask), 0).toFixed(2) : 0.00 }
          <span data-testid="header-currency-field">BRL</span>
        </p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(Object).isRequired,
};

export default connect(mapStateToProps)(Header);
