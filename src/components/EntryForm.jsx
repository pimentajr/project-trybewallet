import React, { Component } from 'react';
import PropTypes from 'prop-types';

class EntryForm extends Component {
  render() {
    const { currencies } = this.props;

    return (
      <form>
        <label htmlFor="value">
          Valor:
          <input name="value" type="number" />
        </label>

        <label htmlFor="currency">
          Moeda:
          <select name="currency">
            {
              currencies.map((currency, index) => (
                <option
                  key={ index }
                  value={ currency.code }
                >
                  {currency.code}
                </option>
              ))
            }
          </select>
        </label>

        <label htmlFor="paymentMethod">
          Método de pagamento:
          <select name="paymentMethod">
            <option value="money">Dinheiro</option>
            <option value="creditCard">Cartão de crédito</option>
            <option value="debitCard">Cartão de débito</option>
          </select>
        </label>

        <label htmlFor="tag">
          Tag:
          <select name="tag">
            <option value="food">Alimentação</option>
            <option value="leisure">Lazer</option>
            <option value="work">Trabalho</option>
            <option value="transport">Transporte</option>
            <option value="health">Saúde</option>
          </select>
        </label>
      </form>
    );
  }
}

EntryForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.object),
}.isRequired;

export default EntryForm;
