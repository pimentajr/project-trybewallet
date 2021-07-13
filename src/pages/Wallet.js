import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Forms from './Forms';
import Count from './Count';
import { fetchCurrencies, newExpenseAction } from '../actions';

class Wallet extends React.Component {
  constructor() {
    super();

    this.handleClick = this.handleClick.bind(this);
  }

  async handleClick() {
    // get form details
    const { addExpense, getCurrencies, currencies, expenses } = this.props;
    const formElement = document.forms['newExpense-form'];
    await getCurrencies();

    addExpense({
      id: expenses.length,
      value: formElement.elements.totalValue.value,
      description: formElement.elements.description.value,
      currency: formElement.elements.currency.value,
      method: formElement.elements.method.value,
      tag: formElement.elements.tag.value,
      exchangeRates: currencies,
    });

    formElement.reset();
  }

  render() {
    // render forms
    const { email, expenses } = this.props;

    // reduce all values to a total value
    const total = expenses.length > 0
      ? expenses.reduce((acc, curr) => (
        acc + curr.value * curr.exchangeRates[curr.currency].ask), 0)
        .toFixed(2) : 0;

    // render forms
    return (
      <div>
        <header>
          <p data-testid="email-field">{email}</p>
          <p data-testid="total-field">
            Despesa Total: R$
            {total}
          </p>
        </header>
        <Forms />
        <Count />
        <button type="button" onClick={ this.handleClick }>
          Adicionar despesa
        </button>
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
  };
}

// dispatch
const mapDispatchToProps = (dispatch) => ({
  getCurrencies: () => dispatch(fetchCurrencies()),
  addExpense: (details) => dispatch(newExpenseAction(details)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);

// props validation
Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.any).isRequired,
  expenses: PropTypes.arrayOf(PropTypes.any).isRequired,
  addExpense: PropTypes.func.isRequired,
  getCurrencies: PropTypes.func.isRequired,
};
