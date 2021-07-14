import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Selects extends Component {
  render() {
    const { currencies, method, tag, currency, func, FIFTEEN } = this.props;
    return (
      <div className="secDiv">
        <label htmlFor="currency">
          Moeda:
          <select
            name="currency"
            id="currency"
            value={ currency }
            onChange={ func }
            data-testid="currency-input"
          >
            { Object.values(currencies).splice(1, FIFTEEN).map((code, index) => (
              <option key={ index }>{code.code}</option>
            )) }
          </select>
        </label>
        <label htmlFor="method">
          Método de pagamento:
          <select
            name="method"
            id="method"
            value={ method }
            onChange={ func }
            data-testid="method-input"
          >
            <option>Dinheiro</option>
            <option>Cartão de Crédito</option>
            <option>Cartão de Débito</option>
          </select>
        </label>
        <label htmlFor="tag">
          Tag:
          <select
            name="tag"
            id="tag"
            value={ tag }
            onChange={ func }
            data-testid="tag-input"
          >
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </label>
      </div>);
  }
}

Selects.propTypes = {
  currency: PropTypes.string.isRequired,
  FIFTEEN: PropTypes.number.isRequired,
  currencies: PropTypes.objectOf(String).isRequired,
  tag: PropTypes.string.isRequired,
  method: PropTypes.string.isRequired,
  func: PropTypes.func.isRequired,
};

export default Selects;
