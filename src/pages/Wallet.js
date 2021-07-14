import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { fetchApi } from '../actions';
import ExpensesForm from '../components/ExpensesForm';

class Wallet extends React.Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     value: 0,
  //   };
  // }

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
    const { email, walletExpenses } = this.props;
    // console.log(walletExpenses);
    // const { value } = this.state;
    return (
      <div>
        <header>
          <div>TrybeWallet</div>
          <div data-testid="email-field">{ email }</div>
          <p data-testid="total-field">
            { `Total: R$ ${this.InBLR(walletExpenses).toFixed(2)}` }
          </p>
          <div data-testid="header-currency-field">BRL</div>
        </header>
        <form>
          <label htmlFor="name">
            Nome:
            <input type="text" name="name" />
          </label>
          <ExpensesForm />
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  walletExpenses: state.wallet.expenses,
});

// const mapDispatchToProps = (dispatch) => ({
//   requestApi: () => dispatch(fetchApi()),
// });

Wallet.propTypes = {
  email: PropTypes.string,
  walletExpenses: PropTypes.arrayOf(PropTypes.object),
}.isRequired;

export default connect(mapStateToProps)(Wallet);
