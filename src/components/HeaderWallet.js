import React from 'react';
import PropTypes from 'prop-types';

function HeaderWallet({ userEmail, totalExpense, currentCurrency }) {
  return (
    <header>
      <p data-testid="email-field">
        Email:
        { userEmail }
      </p>
      <p data-testid="total-field">
        Despesa Total:
        { totalExpense }
      </p>
      <p data-testid="header-currency-field">
        Câmbio Atual:
        { currentCurrency }
      </p>
    </header>
  );
}

HeaderWallet.propTypes = {
  userEmail: PropTypes.string.isRequired,
  totalExpense: PropTypes.number.isRequired,
  currentCurrency: PropTypes.string.isRequired,
};

export default HeaderWallet;
