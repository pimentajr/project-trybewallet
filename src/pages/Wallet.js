import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCoins, testeExpencies } from '../actions';
import WalletForm from '../components/walletForm';
import Table from '../components/Table';

class Wallet extends React.Component {
  expenses(sum, expense) {
    return parseFloat(expense.value * expense.exchangeRates[expense.currency].ask) + sum;
  }

  render() {
    const { email, expenses } = this.props;
    return (
      <div>
        <header>
          <span data-testid="email-field">{email}</span>
          <span data-testid="total-field">
            { expenses.reduce(this.expenses, 0)}
          </span>
          <span data-testid="header-currency-field">Câmbio: BRL</span>
        </header>
        <WalletForm />
        <Table />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  mostraMoeda: () => dispatch(fetchCoins()),
  adicionaEstadoGlobal: (state) => dispatch(testeExpencies(state)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    value: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    currency: PropTypes.string.isRequired,
    method: PropTypes.string.isRequired,
    tag: PropTypes.string.isRequired,
  })).isRequired,
};
