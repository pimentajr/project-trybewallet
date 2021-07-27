import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Method extends Component {
  render() {
    const { up, value } = this.props;
    return (
      <label htmlFor="method">
        Método de pagamento:
        <select data-testid="method-input" onChange={ up } id="method" value={ value }>
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>
      </label>
    );
  }
}

export default Method;

Method.propTypes = {
  up: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

// Source: auxílio do colega Douglas e consulta ao repositório do Marcos
