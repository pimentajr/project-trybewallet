import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import WalletForm from '../components/WalletForm';
import { fetchCurrencies } from '../actions/wallet';
import ExpensesTable from '../components/ExpensesTable';
import './Wallet.css';

class Wallet extends React.Component {
  componentDidMount() {
    const { fetchCurrenciesAPI } = this.props;
    fetchCurrenciesAPI();
  }

  render() {
    const { userEmail, expenses } = this.props;
    const radix = 10;
    // const exchangeToExpense = expenses.map((expense) => expense.exchangeRates[expense.currency].ask)

    return (
      <>
        <header className="wallet-header">
          <p>Trybewallet</p>
          <p data-testid="email-field">{`Usuário: ${userEmail}`}</p>
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
        <WalletForm />
        <ExpensesTable />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
  loading: state.wallet.isLoading,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCurrenciesAPI: () => dispatch(fetchCurrencies()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);

Wallet.propTypes = {
  userEmail: PropTypes.string.isRequired,
  fetchCurrenciesAPI: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(
    PropTypes.string,
  ).isRequired,
};
