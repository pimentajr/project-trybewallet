import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import requestAPI from '../services/requestAPI';
import { fetchAPI, addExpense } from '../actions';

class FormDispenses extends Component {
  constructor(props) {
    super(props);
    this.valuesAPI = this.valuesAPI.bind(this);
    this.addNewExpenses = this.addNewExpenses.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.formWallet = this.formWallet.bind(this);
    this.formWalletExtend = this.formWalletExtend.bind(this);
    this.state = {
      currency: 'USD',
      description: '',
      value: 0,
      tag: 'Lazer',
      method: 'Cartão de crédito',
    };
  }

  componentDidMount() {
    const { loadingValues } = this.props;
    return loadingValues();
  }

  valuesAPI() {
    const { currencies } = this.props;
    return (
      currencies.map((currencie) => (
        <option key={ currencie } value={ currencie }>{currencie}</option>
      ))
    );
  }

  addNewExpenses() {
    const { saveExpenses } = this.props;
    saveExpenses(this.state);
    this.setState({
      currency: 'EUR',
      description: '',
      value: 0,
      tag: 'Trabalho',
      method: 'Cartão de débito',
    });
  }

  handleChange({ target: { name, value } }) {
    this.setState({
      [name]: value,
    });
  }

  formWallet() {
    const { value, description } = this.state;
    return (
      <>
        <label htmlFor="value">
          Valor
          <input
            type="number"
            value={ value }
            name="value"
            id="value"
            min="0"
            placeholder="digite o valor da despesa"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="description">
          Descrição
          <input
            type="text"
            value={ description }
            name="description"
            id="description"
            placeholder="digite a descrição da despesa"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="value-coins">
          Moeda
          <select id="value-coins">
            {this.valuesAPI()}
          </select>
        </label>
      </>
    );
  }

  formWalletExtend() {
    const { method, tag } = this.state;
    return (
      <>
        <label htmlFor="method">
          Método de pagamento
          <select
            id="method"
            name="method"
            value={ method }
            onChange={ this.handleChange }
          >
            <option value="money">Dinheiro</option>
            <option value="credit-card">Cartão de crédito</option>
            <option value="debit-card">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag">
          Tag
          <select
            id="tag"
            name="tag"
            value={ tag }
            onChange={ this.handleChange }
          >
            <option value="food">Alimentação</option>
            <option value="freetime">Lazer</option>
            <option value="work">Trabalho</option>
            <option value="transport">Transporte</option>
            <option value="health">Saúde</option>
          </select>
        </label>
        <button
          type="button"
          onClick={ () => this.addNewExpenses() }
        >
          Adicionar despesa
        </button>
      </>
    );
  }

  render() {
    return (
      <div>
        <form>
          { this.formWallet() }
          { this.formWalletExtend() }
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  loadingValues: () => dispatch(fetchAPI()),
  saveExpenses: (expenses) => dispatch(addExpense(expenses)),
});

FormDispenses.propTypes = {
  currencies: PropTypes.arrayOf,
  loadingValues: PropTypes.func,
  expenses: PropTypes.arrayOf,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(FormDispenses);
