import { connect } from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types';
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
      <div>
        <header>
          <p data-testid="email-field">{email}</p>
          <p data-testid="total-field">
            {(expenses.length === 0) ? 0
              : expenses.reduce((acc, expense) => (
                acc + (parseInt(expense.value, radix))
                * Object.values(expense.exchangeRates).find((cotacao) => (
                  cotacao.code === expense.currency
                )).ask), 0)}
          </p>
          <p data-testid="header-currency-field"> BRL </p>
        </header>
        <FormsWallet />
        <ExpensesTable />
      </div>
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
Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  fetchCurrenciesAPI: PropTypes.func.isRequired,
  expenses: PropTypes.shape({
    currency: PropTypes.string,
    length: PropTypes.func,
    reduce: PropTypes.func,
  }).isRequired,
};
export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
