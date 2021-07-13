import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ExpensesForm from '../components/ExpensesForm';
import Table from '../components/Table';

class Wallet extends React.Component {
  // String(walletExpenses.reduce((acc, cur) => acc + Number(cur.value), 0).toFixed(2),)
  exchangeValue({ currency, value, exchangeRate }) {
    const sumExchange = value * exchangeRate[currency];
    return sumExchange;
  }

  InBLR(walletExpenses) {
    const valueInBRL = walletExpenses.reduce((acc, expense) => {
      const { value, currency, exchangeRates } = expense;
      return acc + (parseFloat(value) * exchangeRates[currency].ask);
    }, 0);
    return valueInBRL;
  }

  render() {
    const { email } = this.props;
    const { walletExpenses } = this.props;
    return (
      <>
        <div>Logo</div>
        <div data-testid="email-field">{ email }</div>
        <p data-testid="total-field">
          {`Despesa total: R$ ${this.InBLR(walletExpenses).toFixed(2)}`}
        </p>
        <span data-testid="header-currency-field"> BRL</span>
        <ExpensesForm />
        {walletExpenses.length > 0 ? <Table /> : null}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  walletExpenses: state.wallet.expenses,

});

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  walletExpenses: PropTypes.arrayOf(PropTypes.object).isRequired,

};

export default connect(mapStateToProps)(Wallet);
