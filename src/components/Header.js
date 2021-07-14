import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './Header.css';

class Header extends Component {
  renderTotalExpense(expenses) {
    const total = expenses.reduce((acc, expense) => {
      const exchangeRate = Number(expense.exchangeRates[expense.currency].ask);
      const price = Number(expense.value) * exchangeRate;
      return acc + price;
    }, 0);

    return (
      <p>
        {`Gasto total: ${(total / 100).toFixed(2)} `}
        <span data-testid="header-currency-field">BRL</span>
      </p>);
  }

  render() {
    const { userEmail, expenses } = this.props;
    return (
      <header className="header-container">
        <h1 className="header-title">TrybeWallet</h1>
        <div className="header-info">
          <p data-testid="email-field">
            Usuário:
            {' '}
            {userEmail}
          </p>
          {this.renderTotalExpense(expenses)}
        </div>
      </header>

    );
  }
}

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  userEmail: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
  })).isRequired,
};

export default connect(mapStateToProps)(Header);
