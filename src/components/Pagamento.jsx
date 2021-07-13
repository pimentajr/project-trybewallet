import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Pagamento extends Component {
  render() {
    const { method, handleInput } = this.props;
    return (
      <label htmlFor="method">
        Método de pagamento:
        <select
          data-testid="method-input"
          id="method"
          name="method"
          onChange={ handleInput }
          value={ method }
        >
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>
      </label>
    );
  }
}

Pagamento.propTypes = {
  method: PropTypes.string,
  handleInput: PropTypes.func,
}.isRequired;
