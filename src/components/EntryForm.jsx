import React, { Component } from 'react';
import PropTypes from 'prop-types';

class EntryForm extends Component {
  constructor() {
    super();
    this.renderValue = this.renderValue.bind(this);
    this.renderCurrencies = this.renderCurrencies.bind(this);
    this.renderPaymentMethod = this.renderPaymentMethod.bind(this);
    this.renderTag = this.renderTag.bind(this);
    this.renderDescription = this.renderDescription.bind(this);
  }

  renderValue() {
    const { value, handleChange } = this.props;
    return (
      <label htmlFor="value">
        Valor
        <input
          name="value"
          type="number"
          id="value"
          value={ value }
          onChange={ handleChange }
        />
      </label>
    );
  }

  renderCurrencies() {
    const { currency, currencies, handleChange } = this.props;
    return (
      <label htmlFor="currency">
        Moeda
        <select
          name="currency"
          id="currency"
          onChange={ handleChange }
          value={ currency }
        >
          {
            currencies.map((item, index) => (
              <option
                key={ index }
                value={ item }
              >
                {item}
              </option>
            ))
          }
        </select>
      </label>
    );
  }

  renderPaymentMethod() {
    const { handleChange, paymentMethod } = this.props;
    return (
      <label htmlFor="paymentMethod">
        Método de pagamento
        <select
          name="paymentMethod"
          id="paymentMethod"
          onChange={ handleChange }
          value={ paymentMethod }
        >
          <option value="money">Dinheiro</option>
          <option value="creditCard">Cartão de crédito</option>
          <option value="debitCard">Cartão de débito</option>
        </select>
      </label>
    );
  }

  renderTag() {
    const { handleChange, tag } = this.props;
    return (
      <label htmlFor="tag">
        Tag
        <select
          name="tag"
          id="tag"
          onChange={ handleChange }
          value={ tag }
        >
          <option value="food">Alimentação</option>
          <option value="leisure">Lazer</option>
          <option value="work">Trabalho</option>
          <option value="transport">Transporte</option>
          <option value="health">Saúde</option>
        </select>
      </label>
    );
  }

  renderDescription() {
    const { description, handleChange } = this.props;
    return (
      <label htmlFor="description">
        Descrição
        <input
          type="text"
          name="description"
          id="description"
          value={ description }
          onChange={ handleChange }
        />
      </label>
    );
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={ handleSubmit }>
        {this.renderValue()}
        {this.renderCurrencies()}
        {this.renderPaymentMethod()}
        {this.renderTag()}
        {this.renderDescription()}

        <input type="submit" value="Adicionar despesa" />
      </form>
    );
  }
}

EntryForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.object),
}.isRequired;

export default EntryForm;
