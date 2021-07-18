import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
  render() {
    const { email, expenses } = this.props;

    const totalExpenses = expenses.reduce((acc, item) => {
      const exchangeRate = Number(item.exchangeRates[item.currency].ask);
      return acc + item.value * exchangeRate;
    }, 0);

    return (
      <header>
        <h1>TrybeWallet</h1>
        <p data-testid="email-field">{email}</p>
        <p data-testid="total-field">{totalExpenses}</p>
        <p data-testid="header-currency-field">BRL</p>
      </header>
    );
  }
}

function mapStateToProps(state) {
  return {
    email: state.user.email,
    expenses: state.wallet.expenses,
  };
}

Header.defaultProps = {
  email: '',
};

Header.propTypes = {
  email: PropTypes.string,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps)(Header);
