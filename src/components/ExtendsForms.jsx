import React, { Component } from 'react';
import PropTypes from 'prop-types';

const optionsTag = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];

class ExtendsForms extends Component {
  constructor(props) {
    super(props);
    this.renderExtendsFormsOne = this.renderExtendsFormsOne.bind(this);
    this.renderExtendsFormsTwo = this.renderExtendsFormsTwo.bind(this);
  }

  renderExtendsFormsOne() {
    const { method, currency, currencies, handleInput } = this.props;

    return (
      <>
        <label htmlFor="moedaSelect">
          Moeda:
          <div className="select is-small">
            <select
              id="moedaSelect"
              name="currency"
              value={ currency }
              onChange={ handleInput }
            >
              {Object.keys(currencies)
                .filter((e) => e !== 'USDT')
                .map((option, index) => <option key={ index }>{option}</option>)}
            </select>
          </div>
        </label>
        <label htmlFor="modePayment">
          Método de pagamento:
          <div className="select is-small">
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
          </div>
        </label>
      </>

    );
  }

  renderExtendsFormsTwo() {
    const { tag, handleInput } = this.props;
    return (
      <label htmlFor="tag">
        Tag:
        <div className="select is-small">
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
        </div>
      </label>
    );
  }

  render() {
    return (
      <>
        {this.renderExtendsFormsOne()}
        {this.renderExtendsFormsTwo()}
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
