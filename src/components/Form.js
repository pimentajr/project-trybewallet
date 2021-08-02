import React, { Component } from 'react';

class Form extends Component {
  constructor() {
    super();

    this.renderCurrencies = this.renderCurrencies.bind(this);
    this.renderTags = this.renderTags.bind(this);
    this.renderPaymentMethods = this.renderPaymentMethods.bind(this);
  }

  renderCurrencies() {
    return (
      <select
        name="currency"
        id="currency"
        data-testid="currency-input"
      >
        USD
      </select>
    );
  }

  renderTags() {
    return (
      <select
        name="tag"
        id="tag"
        data-testid="tag-input"
      >
        <option value="Alimentação">Alimentação</option>
        <option value="Lazer">Lazer</option>
        <option value="Trabalho">Trabalho</option>
        <option value="Transporte">Transporte</option>
        <option value="Saúde">Saúde</option>
      </select>
    );
  }

  renderPaymentMethods() {
    return (
      <select
        name="method"
        id="method"
        data-testid="method-input"
      >
        <option value="Dinheiro">Dinheiro</option>
        <option value="Cartão de crédito">Cartão de crédito</option>
        <option value="Cartão de débito">Cartão de débito</option>
      </select>
    );
  }

  render() {
    return (
      <div>
        <form>
          <label htmlFor="value">
            Valor:
            <input
              type="text"
              name="value"
              id="value"
              data-testid="value-input"
            />
          </label>
          <label htmlFor="description">
            Descrição:
            <input
              type="text"
              name="description"
              id="description"
              data-testid="description-input"
            />
          </label>
          <label htmlFor="currency">
            Moeda:
            { this.renderCurrencies() }
          </label>
          <label htmlFor="method">
            Método de pagamento:
            {this.renderPaymentMethods()}
          </label>
          <label htmlFor="tag">
            Tag:
            {this.renderTags()}
          </label>
        </form>
      </div>
    );
  }
}

export default Form;
