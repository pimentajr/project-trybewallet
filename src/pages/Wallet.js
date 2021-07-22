import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FormsWallet from '../components/FormsWallet';
import { fetchCurrencies } from '../actions/wallet';
import ExpensesTable from '../components/ExpensesTable';

class Wallet extends React.Component {
  componentDidMount() {
    const { fetchCurrenciesAPI } = this.props;
    fetchCurrenciesAPI();
  }

  render() {
    const { email, expenses } = this.props;
    const radix = 10;

    return (
      <>
        <header className="wallet-header">
          <h2>TrybeWallet</h2>
          <p data-testid="email-field">{`Usuário: ${email}`}</p>
          <span className="total-expenses">
            Despesa Total: R$
            <p data-testid="total-field">
              {expenses.reduce((acc, expense) => (
                acc + (parseInt(expense.value, radix))
                * expense.exchangeRates[expense.currency].ask), 0).toFixed(2)}
            </p>
            <p data-testid="header-currency-field">BRL</p>
          </span>
        </header>
        <FormsWallet />
        <ExpensesTable />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  loading: state.wallet.isLoading,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCurrenciesAPI: () => dispatch(fetchCurrencies()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  fetchCurrenciesAPI: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(
    PropTypes.string,
  ).isRequired,
};
