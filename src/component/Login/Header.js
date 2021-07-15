import React from 'react';
import PropTypes from 'prop-types';
import withStore from '../../utils/withStore';

class Header extends React.Component {
  render() {
    const { user, wallet } = this.props;
    const total = wallet.expenses.length === 0
      ? 0
      : wallet.expenses.reduce((acc, expense) => {
        const { value, currency, exchangeRates } = expense;

        return acc + parseFloat(value) * exchangeRates[currency].ask;
      }, 0);

    return (
      <header>
        <h1>Minha carteira</h1>
        <p>
          Logado como:
          <span data-testid="email-field">{user.email}</span>
        </p>
        <p>
          Gasto total:
          <span data-testid="total-field">{total.toFixed(2)}</span>
        </p>
        <p>
          Câmbio realizado para:
          <span data-testid="header-currency-field">BRL</span>
        </p>
      </header>
    );
  }
}

Header.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string,
  }),
  wallet: PropTypes.shape({
    expenses: PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.string,
        currency: PropTypes.string,
        exchangeRates: PropTypes.arrayOf(
          PropTypes.shape({
            ask: PropTypes.string,
          }),
        ),
      }),
    ),
  }),
}.isRequired;

export default withStore(Header, ['user', 'wallet']);
