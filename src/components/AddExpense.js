import React, { Component } from 'react';

class AddExpense extends Component {
  constructor(props) {
    super(props);
    this.renderValueInput = this.renderValueInput.bind(this);
    this.renderDescriptionInput = this.renderDescriptionInput.bind(this);
    this.renderCurrencyInput = this.renderCurrencyInput.bind(this);
    this.renderPaymentMethodInput = this.renderPaymentMethodInput.bind(this);
    this.renderTagInput = this.renderTagInput.bind(this);
  }

  renderValueInput() {
    return (
      <label htmlFor="valor">
        Valor
        <input
          type="number"
          id="valor"
        />
      </label>
    );
  }

  renderDescriptionInput() {
    return (
      <label htmlFor="descricao">
        Descrição
        <input
          type="text"
          id="descricao"
        />
      </label>
    );
  }

  renderCurrencyInput() {
    return (
      <label htmlFor="moeda">
        Moeda
        <select
          id="moeda"
        >
          <option
            value="Padrão"
          >
            ---
          </option>
        </select>
      </label>
    );
  }

  renderPaymentMethodInput() {
    return (
      <label htmlFor="pagamento">
        Método de pagamento
        <select
          id="pagamento"
        >
          <option value="Dinheiro">
            Dinheiro
          </option>
          <option value="Cartão de Crédito">
            Cartão de Crédito
          </option>
          <option value="Cartão de Débito">
            Cartão de Débito
          </option>
        </select>
      </label>
    );
  }

  renderTagInput() {
    return (
      <label htmlFor="tag">
        Tag
        <select
          id="tag"
        >
          <option
            value="alimentação"
          >
            Alimentação
          </option>
          <option
            value="Lazer"
          >
            Lazer
          </option>
          <option
            value="Trabalho"
          >
            Trabalho
          </option>
          <option
            value="Transporte"
          >
            Transporte
          </option>
          <option
            value="Saúde"
          >
            Saúde
          </option>
        </select>
      </label>
    );
  }

  render() {
    return (
      <form className="addExpense">
        { this.renderValueInput() }
        { this.renderDescriptionInput() }
        { this.renderCurrencyInput() }
        { this.renderPaymentMethodInput() }
        { this.renderTagInput() }
      </form>
    );
  }
}

export default AddExpense;
