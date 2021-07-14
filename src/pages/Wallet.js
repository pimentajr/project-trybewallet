import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import WalletForm from '../component/WalletForm';
import { fetchCurrenciesApi } from '../actions';
import trybeLogo from '../image/trybeP.png';
import '../App.css';

class Wallet extends React.Component {
  componentDidMount() {
    const { fetchThunk } = this.props;
    fetchThunk();
  }

  render() {
    const { emailUser, expenses } = this.props;
    const sumOfExpenses = expenses.reduce((acc, curr) => acc + Number(curr.value)
      * Number(curr.exchangeRates[curr.currency].ask), 0);

    return (
      <div>
        <header className="header">
          <img src={ trybeLogo } alt="logoTrybe" />
          <h2 data-testid="email-field">
            Olá:
            { emailUser }
          </h2>
          <label htmlFor="expenses">
            Despesas:
            <span data-testid="total-field">{ sumOfExpenses }</span>
            <span data-testid="header-currency-field">BRL</span>
          </label>
        </header>
        <WalletForm />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  emailUser: state.user.email,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  fetchThunk: () => dispatch(fetchCurrenciesApi()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);

Wallet.propTypes = {
  emailUser: PropTypes.string.isRequired,
  fetchThunk: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.string).isRequired,
};
