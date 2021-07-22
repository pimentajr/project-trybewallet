import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchApi, save, deleteExpense } from '../actions/index';
import TabelaGastos from '../components/Gastos';

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };
    this.value = this.value.bind(this);
    this.description = this.description.bind(this);
    this.currency = this.currency.bind(this);
    this.method = this.method.bind(this);
    this.tag = this.tag.bind(this);
    this.header = this.header.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.addExpense = this.addExpense.bind(this);
  }

  componentDidMount() {
    const { moedasApi } = this.props;
    moedasApi();
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  addExpense() {
    const { savedExpenses } = this.props;
    const { value, description, currency, method, tag } = this.state;
    let id = 0;
    if (savedExpenses.length !== 0) {
      const savedExpensesLength = savedExpenses.length;
      const idLength = savedExpenses[savedExpensesLength - 1].id;
      id = idLength + 1;
    }
    const expense = { id, value, description, currency, method, tag };
    const { sendExpense } = this.props;
    sendExpense(expense);
    this.setState({
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação' });
  }

  description() {
    return (
      <label htmlFor="description">
        Descrição
        <input
          type="text"
          name="description"
          id="description"
          onChange={ this.handleChange }
        />
      </label>
    );
  }

  currency() {
    const { moedas } = this.props;
    const { currency } = this.state;
    return (
      <label htmlFor="currency">
        Moeda
        <select
          name="currency"
          id="currency"
          type="combobox"
          onChange={ this.handleChange }
          value={ currency }
        >
          { moedas.map((cur, index) => (
            <option key={ index } value={ cur }>
              { cur }
            </option>)) }
        </select>
      </label>
    );
  }

  method() {
    const { method } = this.state;
    return (
      <label htmlFor="method">
        Método de pagamento
        <select id="method" name="method" onChange={ this.handleChange } value={ method }>
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>
      </label>
    );
  }

  tag() {
    const { tag } = this.state;
    return (
      <label htmlFor="tag">
        Tag
        <select
          id="tag"
          name="tag"
          onChange={ this.handleChange }
          value={ tag }
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

  header() {
    const { email, savedExpenses } = this.props;
    let totalExpenses = 0;
    savedExpenses.forEach((exp) => {
      totalExpenses += parseFloat(((parseFloat(exp.value)
      * parseFloat(exp.exchangeRates[exp.currency].ask))).toFixed(2));
    });

    return (
      <header>
        <p data-testid="email-field">
          Email:
          {' '}
          {email}
          <br />
        </p>
        <p data-testid="total-field">
          Despesas:
          { totalExpenses }
        </p>
        <p data-testid="header-currency-field">
          BRL
        </p>
      </header>
    );
  }

  value() {
    return (
      <label htmlFor="value">
        {' '}
        Valor
        <input
          type="text"
          text="valor"
          id="value"
          name="value"
          onChange={ this.handleChange }
        />
      </label>
    );
  }

  addButton() {
    return (
      <section>
        <button
          type="button"
          onClick={ () => this.addExpense() }
        >
          Adicionar Despesa
        </button>
      </section>
    );
  }

  renderForm() {
    return (
      <form>
        {this.value()}
        {this.description()}
        {this.currency()}
        {this.method()}
        {this.tag()}
        {this.addButton()}
      </form>
    );
  }

  render() {
    return (
      <div>
        TrybeWallet
        {this.header()}
        {this.form()}
        <TabelaGastos />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  moedas: state.wallet.currencies,
  isFetching: state.wallet.isFetching,
  savedExpenses: state.wallet.expenses,
  dados: state.wallet.dados,
});

const mapDispatchToProps = (dispatch) => ({
  moedasApi: () => dispatch(fetchApi()),
  sendExpense: (expense) => dispatch(save(expense)),
  deleteExpense: (expense) => dispatch(deleteExpense(expense)),
});

Wallet.propTypes = {
  email: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
