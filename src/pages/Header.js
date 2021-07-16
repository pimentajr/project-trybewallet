import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  totalValue() {
    const { expenses } = this.props;
    return expenses.reduce((acc, curr) => {
      const value = curr.exchangeRates[curr.currency].ask * curr.value;
      acc += value;
      return acc;
    }, 0);
  }

  render() {
    const { login } = this.props;
    return (
      <header>
        <h2 data-testid="email-field">{ login }</h2>
        <h3 data-testid="header-currency-field">
          Valor de despesas: R$
          <div>
            <span data-testid="total-field">{ this.totalValue() }</span>
          </div>
          BRL
        </h3>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  login: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  login: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps)(Header);
