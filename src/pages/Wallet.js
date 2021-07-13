import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Forms from './Forms';
import Count from './Count';
import { newExpenseAction } from '../actions';
import Customize from './Customize';

class Wallet extends React.Component {
  render() {
    // render forms
    const { email, expenses, editMenu } = this.props;

    // reduce all values to a total value
    const total = expenses.length > 0
      ? expenses.reduce((acc, curr) => (
        acc + curr.value * curr.exchangeRates[curr.currency].ask), 0)
        .toFixed(2) : 0;

    // render forms
    return (
      <div>
        <header>
          <p data-testid="total-field">
            Despesa Total: R$
            {total}
            <div data-testid="header-currency-field"> BRL </div>
          </p>
          <p data-testid="email-field">{email}</p>
        </header>
        <main>
          {expenses.length > 0 ? (<Count />) : (
            <h3>Nenhuma Despesa Cadastrada</h3>
          )}
        </main>
        <footer>{editMenu ? <Customize /> : <Forms />}</footer>
      </div>
    );
  }
}

// action function
function mapStateToProps(state) {
  return {
    email: state.user.email,
    currencies: state.wallet.currencies,
    expenses: state.wallet.expenses,
    editMenu: state.wallet.editMenu,
  };
}

// dispatch
const mapDispatchToProps = (dispatch) => ({
  addExpense: (details) => dispatch(newExpenseAction(details)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);

// props validation
Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  editMenu: PropTypes.bool.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.any).isRequired,
};
