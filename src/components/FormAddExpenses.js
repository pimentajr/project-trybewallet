import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCurrencies } from '../actions';

class FormAddExpenses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      exchangeRates: {},
    };

    this.handleChange = this.handleChange.bind(this);
    this.addExpense = this.addExpense.bind(this);
  }

  componentDidMount() {
    const { dispathFetch } = this.props;
    dispathFetch();
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  handleValue() {
    const { value } = this.state;

    return (
      <label htmlFor="value">
        Valor
        <input
          type="Text"
          id="value"
          name="value"
          value={ value }
          onChange={ this.handleChange }
        />
      </label>
    );
  }

  handleDescription() {
    const { description } = this.state;

    return (
      <label htmlFor="description">
        Descrição
        <input
          type="Text"
          id="description"
          name="description"
          value={ description }
          onChange={ this.handleChange }
        />
      </label>
    );
  }

  handleCoin() {
    const { currency } = this.state;
    const { currencies } = this.props;

    return (
      <label htmlFor="currency">
        Moeda
        <select
          id="currency"
          name="currency"
          value={ currency }
          onChange={ this.handleChange }
        >
          { currencies.map((coin, index) => (
            <option
              value={ coin }
              key={ index }
            >
              { coin }
            </option>
          )) }
        </select>
      </label>
    );
  }

  handlePayment() {
    const { method } = this.state;

    return (
      <label htmlFor="method">
        Método de pagamento
        <select
          id="method"
          name="method"
          value={ method }
          onChange={ this.handleChange }
        >
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>
      </label>
    );
  }

  handleTag() {
    const { tag } = this.state;

    return (
      <label htmlFor="tag">
        Tag
        <select
          id="tag"
          name="tag"
          value={ tag }
          onChange={ this.handleChange }
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

  addExpense() {
    const { dispathFetch } = this.props;
    dispathFetch(this.state);
    this.setState((prev) => ({
      id: prev.id + 1,
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    }));
  }

  render() {
    return (
      <form method="#">
        { this.handleValue() }
        { this.handleDescription() }
        { this.handleCoin() }
        { this.handlePayment() }
        { this.handleTag() }

        <button
          type="button"
          onClick={ this.addExpense }
        >
          Adicionar despesa
        </button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  dispathFetch: (state) => dispatch(fetchCurrencies(state)),
});

FormAddExpenses.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  dispathFetch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(FormAddExpenses);

// no requisito 8 o Jean Esteves - Turma 11 me ajudou muito a desenrolar
