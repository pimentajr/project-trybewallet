import React, { Component } from 'react';
import PropTypes from 'prop-types';

const optionsTag = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];

class ExtendsForms extends Component {
  render() {
    const { method, currencies, tag, handleInput } = this.props;
    return (
      <>
        <label htmlFor="moedaSelect">
          Moeda:
          <select
            id="moedaSelect"
            type="number"
            name="moeda"
            value={ currencies }
            onChange={ handleInput }
          >
            {Object.keys(currencies)
              .filter((e) => e !== 'USDT')
              .map((option, index) => <option key={ index }>{option}</option>)}
          </select>
        </label>
        <label htmlFor="modePayment">
          Método de pagamento:
          <select
            type="number"
            id="modePayment"
            name="method"
            value={ method }
            onChange={ handleInput }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag">
          Tag:
          <select
            type="number"
            id="tag"
            name="tag"
            value={ tag }
            onChange={ handleInput }
          >
            { optionsTag.map((optionTag, index) => (
              <option value={ optionTag } key={ index }>{optionTag}</option>
            ))}
          </select>
        </label>
      </>
    );
  }
}

export default ExtendsForms;

ExtendsForms.propTypes = {
  currency: PropTypes.object,
  method: PropTypes.string,
  tag: PropTypes.string,
}.isRequired;
