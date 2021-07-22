// requisito 05
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { userEmail, expenses } = this.props;
    const totalExpenses = expenses.length > 0 ? expenses
      .reduce((acc, curr) => {
        const value = curr.exchangeRates[curr.currency].ask * curr.value;
        acc += value;
        return acc;
      }, 0)
      : 0;
    return (
      <div>
        <h2 data-testid="email-field">
          { userEmail }
        </h2>
        <h2 data-testid="total-field">{ totalExpenses.toFixed(2) }</h2>
        <h2 data-testid="header-currency-field">BRL</h2>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = ({
  userEmail: PropTypes.string,
}).isRequired;

export default connect(mapStateToProps)(Header);
