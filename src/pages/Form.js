import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchExpenses, fetchAPICurrencies } from '../actions';

class Form extends Component {
  constructor(props) {
    super(props);

    const { expenses } = this.props;
    this.state = {
      id: expenses.length,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      exchangeRates: {},
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  handleClick() {
    // envia o state via dispatch e reset state
    const { requestApi, expenses } = this.props;
    requestApi(this.state);

    this.setState({
      id: expenses.length + 1,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      exchangeRates: {},
    });
  }

  render() {
    const { value, description, currency, method, tag } = this.state;
    const { currencies } = this.props;
    return (
      <form>
        <label htmlFor="value">
          Valor
          <input type="text" name="value" id="value" value={ value } onChange={ this.handleChange } />
        </label>
        <label htmlFor="description">
          Descrição
          <input type="text" name="description" id="description" value={ description } onChange={ this.handleChange } />
        </label>
        <label htmlFor="currency">
          Moeda
          <select id="currency" name="currency" value={ currency } onChange={ this.handleChange }>
            { currencies.map((item, index) => <option key={ index }>{ item }</option>) }
          </select>
        </label>
        <label htmlFor="method">
          Método de pagamento
          <select id="method" name="method" value={ method } onChange={ this.handleChange }>
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag">
          Tag
          <select id="tag" name="tag" value={ tag } onChange={ this.handleChange }>
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
        <button
          type="button"
          onClick={ this.handleClick }
        >
          Adicionar Despesas
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
  fetchCurrencies: (state) => dispatch(fetchAPICurrencies(state)),
  requestApi: (state) => dispatch(fetchExpenses(state)),
});

Form.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string),
  expenses: PropTypes.array,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Form);
