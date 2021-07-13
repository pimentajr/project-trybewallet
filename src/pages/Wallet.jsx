import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ExpensesForm from '../component/ExpensesForm';
import { getCurrencies, saveExpense, sumExpenses } from '../actions';

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      idValue: 0,
    };
    this.handleExpense = this.handleExpense.bind(this);
  }

  componentDidMount() {
    const { fetchCurrencies } = this.props;
    return fetchCurrencies();
  }

  async handleExpense() {
    const { fetchCurrencies, currencies, keepExpenses, setTotalField } = this.props;
    const { idValue } = this.state;
    await fetchCurrencies();
    const objectExpense = {
      id: idValue,
      value: document.getElementById('input-value').value,
      description: document.getElementById('input-description').value,
      currency: document.getElementById('select-currency').value,
      method: document.getElementById('payment-method').value,
      tag: document.getElementById('expenses-type').value,
      exchangeRates: currencies[0],
    };
    this.setState({
      idValue: (idValue + 1),
    });
    keepExpenses(objectExpense);
    setTotalField(objectExpense.value, currencies[0][`${objectExpense.currency}`].ask);
  }

  render() {
    const { email, totalField } = this.props;
    return (
      <div>
        <header>
          <h3 data-testid="email-field">{ email }</h3>
          <h3 data-testid="total-field">{ totalField }</h3>
          <h3 data-testid="header-currency-field">BRL</h3>
        </header>
        <section>
          <ExpensesForm />
        </section>
        <button
          onClick={ () => this.handleExpense() }
          type="submit"
        >
          Adicionar despesa
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  totalField: state.wallet.totalField,
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCurrencies: () => dispatch(getCurrencies()),
  keepExpenses: (newExpense) => dispatch(saveExpense(newExpense)),
  setTotalField: (value, askCurrency) => dispatch(sumExpenses(value, askCurrency)),
});

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  totalField: PropTypes.number.isRequired,
  fetchCurrencies: PropTypes.func.isRequired,
  currencies: PropTypes.number.isRequired,
  keepExpenses: PropTypes.func.isRequired,
  setTotalField: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
