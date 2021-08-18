import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchAPI, receiveNewItem } from '../actions';

class FormAddValue extends Component {
  constructor() {
    super();
    this.state = {
      id: 0,
      value: '0',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      exchangeRates: {},
    };
    this.addItem = this.addItem.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target }) {
    const { name } = target;
    const { value } = target;
    this.setState({
      [name]: value,
    });
  }

  async addItem() {
    const { fetch, newItem, itemsTable, currenciesState } = this.props;
    await fetch();
    this.setState({
      id: itemsTable.length,
      exchangeRates: currenciesState,
    });
    newItem(this.state);
    this.setState({
      value: '0',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    });
  }

  render() {
    const { currenciesState } = this.props;
    const currencies = Object.keys(currenciesState);
    const currenciesFilter = currencies.filter((value) => value !== 'USDT');
    return (
      <form>
        <label htmlFor="value">
          Valor:
          <input type="number" id="value" onChange={ this.handleChange } name="value" />
        </label>
        <label htmlFor="description">
          Descrição:
          <textarea
            id="description"
            onChange={ this.handleChange }
            name="description"
          />
        </label>
        <label htmlFor="currency">
          Moeda:
          <select id="currency" onChange={ this.handleChange } name="currency">
            {currenciesFilter.map((value) => (
              <option value={ value } key={ value }>
                { value }
              </option>))}
          </select>
        </label>
        <label htmlFor="method">
          Método de pagamento:
          <select id="method" onChange={ this.handleChange } name="method">
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag">
          Tag:
          <select id="tag" onChange={ this.handleChange } name="tag">
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
        <button type="reset" onClick={ this.addItem }>Adicionar despesa</button>
      </form>
    );
  }
}

FormAddValue.propTypes = {
  currenciesState: PropTypes.arrayOf,
  itemsTable: PropTypes.arrayOf,
  fetch: PropTypes.func,
  newItem: PropTypes.func,
};

FormAddValue.defaultProps = {
  currenciesState: {},
  itemsTable: {},
  fetch: undefined,
  newItem: undefined,
};

const mapStateToProps = (state) => ({
  currenciesState: state.wallet.currencies,
  itemsTable: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  fetch: () => dispatch(fetchAPI()),
  newItem: (state) => dispatch(receiveNewItem(state)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FormAddValue);
