import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FetchedCurrencies from './FetchedCurrencies';
import PaymentMethods from './PaymentMethod';
import Categories from './Categories';
import { updateCurrencyToNewExpense } from '../actions/wallet';

class FormsWallet extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { state } = this;
    const { addNewExpense } = this.props;
    return (
      <form>
        <label htmlFor="valor">
          Valor:
          <input
            name="value"
            type="number"
            id="valor"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="descricao">
          Descrição:
          <input
            name="description"
            type="text"
            id="descricao"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="moeda">
          Moeda:
          <select id="moeda" name="currency" onChange={ this.handleChange }>
            <FetchedCurrencies />
          </select>
        </label>
        <label htmlFor="metodo-de-pagamento">
          Método de pagamento:
          <select id="metodo-de-pagamento" name="method" onChange={ this.handleChange }>
            <PaymentMethods />
          </select>
        </label>
        <label htmlFor="categoria">
          Tag:
          <select id="categoria" name="tag" onChange={ this.handleChange }>
            <Categories />
          </select>
        </label>
        <button type="button" onClick={ () => addNewExpense(state) }>
          Adicionar despesa
        </button>
      </form>
    );
  }
}

FormsWallet.prototypes = {
  FetchedCurrencies: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  addNewExpense: (state) => dispatch(updateCurrencyToNewExpense(state)),
});

export default connect(null, mapDispatchToProps)(FormsWallet);

FormsWallet.propTypes = {
  addNewExpense: PropTypes.func.isRequired,
};
