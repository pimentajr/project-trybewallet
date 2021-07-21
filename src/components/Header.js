import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

function Header(props) {
  const { email, expenses } = props;

  const valueBRL = expenses.reduce((acc, expense) => {
    const { value, currency, exchangeRates } = expense;
    return acc + (parseFloat(value) * exchangeRates[currency].ask);
  }, 0);

  return (
    <header className="header">

      <span data-testid="email-field">
        {email}
      </span>

      <span data-testid="total-field">
        {valueBRL}
      </span>

      <span data-testid="header-currency-field">
        BRL
      </span>

    </header>
  );
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  email: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, null)(Header);
