import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ExpenseForm from '../components/ExpenseForm';
import { getCurrencies } from '../actions';

class Wallet extends React.Component {
  componentDidMount() {
    const { carregarMoedas } = this.props;
    carregarMoedas();
  }

  render() {
    const { email, expenses } = this.props;
    const total = expenses.reduce((acc, { exchangeRates, currency, value }) => (
      acc + (Number(exchangeRates[currency].ask) * Number(value))
    ), 0);

    return (
      <div>
        <header className="header">
          <h1 className="header-title">TrybeWallet</h1>
          <p className="header-email" data-testid="email-field">
            Email:
            {email}
          </p>
          <p>
            Total:
            <span data-testid="total-field">
              {total > 0 ? Math.round(total * 100) / 100 : '0'}
            </span>
            <span data-testid="header-currency-field"> BRL</span>
          </p>
        </header>
        <div className="money-icon-container" />
        <ExpenseForm />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  isLoading: state.wallet.isLoading,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  carregarMoedas: () => dispatch(getCurrencies()),
});

Wallet.propTypes = {
  email: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
