import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getCurrenciesThunk, addExpenses } from '../actions';
import API from './API';

class Forms extends Component {
  constructor() {
    super();

    this.state = {
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      id: 0,
    };

    this.handleChange = this.handleChange.bind(this);
    this.inputRender = this.inputRender.bind(this);
    this.optionsCurrencies = this.optionsCurrencies.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const { setCurrencies } = this.props;
    setCurrencies();
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  inputRender(label, name, type, value) {
    return (
      <label htmlFor={ `${name}-input` }>
        { label }
        <input
          type={ type }
          name={ name }
          value={ value }
          id={ `${name}-input` }
          onChange={ this.handleChange }
        />
      </label>
    );
  }

  optionsCurrencies(value) {
    const { getOptionsCurrencies } = this.props;
    return (
      <select
        id="currency-input"
        name="currency"
        value={ value }
        onChange={ this.handleChange }
      >
        {getOptionsCurrencies.map((currency) => {
          if (currency === 'USDT') return '';
          return (
            <option key={ currency }>
              {currency}
            </option>
          );
        })}
      </select>
    );
  }

  async handleClick() {
    const { setExpenses } = this.props;
    const { value, description, currency, method, tag, id } = this.state;
    const exchangeRates = await API();
    const expense = {
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates,
    };
    setExpenses(expense);
    this.setState({
      ...this.setState,
      id: id + 1,
    });
  }

  render() {
    const { value, description, currency, method, tag } = this.state;
    return (
      <form>
        {this.inputRender('Valor:', 'value', 'number', value)}
        {this.inputRender('Descrição:', 'description', 'text', description)}
        <label htmlFor="currency-input">
          Moeda:
          {this.optionsCurrencies(currency)}
        </label>
        <label htmlFor="method-input">
          Método de pagamento:
          <select
            id="method-input"
            name="method"
            value={ method }
            onChange={ this.handleChange }
          >
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag-input">
          Tag:
          <select
            id="tag-input"
            name="tag"
            value={ tag }
            onChange={ this.handleChange }
          >
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
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
  getOptionsCurrencies: state.wallet.currencies,
});

const mapDispatchToPros = (dispatch) => ({
  setCurrencies: () => dispatch(getCurrenciesThunk()),
  setExpenses: (payload) => dispatch(addExpenses(payload)),
});

export default connect(mapStateToProps, mapDispatchToPros)(Forms);

Forms.propTypes = {
  getOptionsCurrencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  setCurrencies: PropTypes.func.isRequired,
  setExpenses: PropTypes.func.isRequired,
};
