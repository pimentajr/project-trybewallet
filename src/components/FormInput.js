import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { walletExpenses, walletCurrencies } from '../actions';
import apiFetch from '../services/data';

class FormInput extends Component {
  constructor() {
    super();
    this.state = {
      arrayApi: '',
      arrayMethod: ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'],
      arrayTag: ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'],
      objExpenses: {},
      count: 0,
    };

    this.inputValue = this.inputValue.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.submit = this.submit.bind(this);
    this.API = this.API.bind(this);
  }

  componentDidMount() {
    this.API();
  }

  async API() {
    const getApi = await apiFetch().then((resolve) => resolve);
    return this.setState({ arrayApi: getApi });
  }

  handleChange(event) {
    const { name, value } = event.target;
    const { arrayApi, objExpenses, count } = this.state;
    this.setState({
      objExpenses: {
        ...objExpenses,
        id: count,
        [name]: value,
        exchangeRates: arrayApi,
      },
    });
  }

  updateId(i) {
    this.setState({
      count: i += 1,
    });
  }

  sumCurrency(e) {
    const { fromCurrencies, toCurrency } = this.props;
    const magicN = 10;
    const magicN2 = -2;
    const n = parseFloat(fromCurrencies, magicN) + e;
    toCurrency((Math.round((n * 100), magicN2) / 100));
  }

  submit(event) {
    event.preventDefault();
    const { objExpenses, count } = this.state;
    this.updateId(count);
    const { toExpenses } = this.props;
    const magicN = 10;
    const valueN = parseFloat(objExpenses.value, magicN);
    this.sumCurrency(valueN);
    toExpenses(objExpenses);
  }

  inputValue() {
    return (
      <input
        id="value"
        name="value"
        type="number"
        placeholder="Hom much...? Ex: xx.xx"
        onChange={ this.handleChange }
        required="required"
      />
    );
  }

  selectMethod() {
    const { arrayMethod } = this.state;
    return (
      <select
        id="method"
        name="method"
        onChange={ this.handleChange }
        required="required"
      >
        <option value="" data-default disabled selected>How...?</option>
        { arrayMethod.map((e, i) => <option key={ i } name={ e }>{ e }</option>) }
      </select>
    );
  }

  selectTag() {
    const { arrayTag } = this.state;
    return (
      <select id="tag" name="tag" onChange={ this.handleChange } required="required">
        <option
          value=""
          data-default
          disabled
          selected
        >
          About...?
        </option>
        {
          arrayTag
            .map((e, i) => (
              <option id="combobox" key={ i } name={ e.toLowerCase() }>{ e }</option>
            ))
        }
      </select>
    );
  }

  render() {
    const { arrayApi } = this.state;
    return (
      <form onSubmit={ this.submit }>
        <label htmlFor="value">
          Valor
          { this.inputValue() }
        </label>
        <label htmlFor="description">
          Descrição
          <input
            id="description"
            name="description"
            type="text"
            placeholder="What...?"
            onChange={ this.handleChange }
            required="required"
          />
        </label>
        <label htmlFor="currency">
          Moeda
          <select
            id="currency"
            name="currency"
            onChange={ this.handleChange }
            required="required"
          >
            { Object.entries(arrayApi).map((e, i) => {
              if (e[0] !== 'USDT') {
                return <option key={ i } name={ e[0] }>{ e[0] }</option>;
              }
              return undefined;
            }) }
          </select>
        </label>
        <label htmlFor="method">
          Método de pagamento
          { this.selectMethod() }
        </label>
        <label htmlFor="tag">
          Tag
          { this.selectTag() }
        </label>
        <button type="submit">Adicionar despesa</button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  fromWallet: state.wallet.expenses,
  fromCurrencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  toExpenses: (payload) => dispatch(walletExpenses(payload)),
  toCurrency: (payload) => dispatch(walletCurrencies(payload)),
});

FormInput.propTypes = {
  toExpenses: PropTypes.oneOf(
    PropTypes.object,
    PropTypes.array,
  ).isRequired,
  toCurrency: PropTypes.number.isRequired,
  fromCurrencies: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(FormInput);
