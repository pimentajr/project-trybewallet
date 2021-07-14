import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCurrency, addExpense } from '../actions';

class ExpensesForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      description: '',
      value: 0,
      currency: '',
      method: '',
      tag: '',
    };
  }

  componentDidMount() {
    const { APICurrency } = this.props;
    APICurrency();
  }

  currenciesOptions() {
    const { currencies } = this.props;
    return Object.keys(currencies).filter((curr) => curr !== 'USDT');
  }

  description() {
    const { description } = this.state;
    return (
      <label htmlFor="description">
        Descrição:
        <input
          id="description"
          name="description"
          type="text"
          value={ description }
          onChange={ ({ target }) => this.handleChange(target) }

        />
      </label>
    );
  }

  expenseValue() {
    const { value } = this.state;
    return (
      <label htmlFor="value">
        Valor:
        <input
          id="value"
          name="value"
          type="number"
          placeholder="0"
          value={ value }
          onChange={ ({ target }) => this.handleChange(target) }
        />
      </label>
    );
  }

  currency() {
    const { currency } = this.state;
    return (
      <label htmlFor="currency">
        Moeda:
        <select
          id="currency"
          name="currency"
          onChange={ ({ target }) => this.handleChange(target) }
          select={ currency }
        >
          {this.currenciesOptions().map((moeda) => (
            <option key={ moeda } value={ moeda }>{moeda}</option>
          ))}
        </select>
      </label>
    );
  }

  paymentMethod() {
    const { method } = this.state;
    return (
      <label htmlFor="method">
        Método de pagamento:
        <select
          id="method"
          name="method"
          onChange={ ({ target }) => this.handleChange(target) }
          select={ method }
        >
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>
      </label>
    );
  }

  expenseTag() {
    const { tag } = this.state;

    return (
      <label htmlFor="tag">
        tag:
        <select
          id="tag"
          name="tag"
          onChange={ ({ target }) => this.handleChange(target) }
          select={ tag }
        >
          <option value="Alimentação">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>
        </select>
      </label>
    );
  }

  handleChange({ name, value }) {
    this.setState({ [name]: value });
  }

  handleButton() {
    const { description, value, currency, method, tag } = this.state;
    const { currencies, add, walletExpenses } = this.props;
    const expenses = {
      id: walletExpenses.length,
      description,
      value,
      currency,
      method,
      tag,
      exchangeRates: currencies,
    };
    add(expenses);
  }

  render() {
    return (
      <form className="expenses-form">
        {this.expenseTag()}
        {this.description()}
        {this.expenseValue()}
        {this.currency()}
        {this.paymentMethod()}
        <input
          type="button"
          value="Adicionar despesa"
          onClick={ () => this.handleButton() }
        />
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  walletExpenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  APICurrency: () => dispatch(fetchCurrency()),
  add: (expenses, currencies) => dispatch(addExpense(expenses, currencies)),
});

ExpensesForm.propTypes = {
  APICurrency: PropTypes.func.isRequired,
  add: PropTypes.func.isRequired,
  walletExpenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  currencies: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesForm);
