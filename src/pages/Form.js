import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Form extends Component {
  render() {
    const { value, description, currency, payment, tag } = this.props;
    const { currencies, onChange } = this.props;
    return (
      <form>
        <label htmlFor="value">
          Valor
          <input type="text" name="value" id="value" value={ value } />
        </label>
        <label htmlFor="description">
          Descrição
          <input type="text" name="description" id="description" value={ description } />
        </label>
        <label htmlFor="currency">
          Moeda
          <select id="currency" value={ currency } onChange={ onChange }>
            { currencies.map((item, index) => <option key={ index }>{ item }</option>) }
          </select>
        </label>
        <label htmlFor="payment">
          Método de pagamento
          <select id="payment" value={ payment } onChange={ onChange }>
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="expense">
          Tag
          <select id="expense" value={ tag } onChange={ onChange }>
            <option value="alimentacao">Alimentação</option>
            <option value="lazer">Lazer</option>
            <option value="trabalho">Trabalho</option>
            <option value="transporte">Transporte</option>
            <option value="saude">Saúde</option>
          </select>
        </label>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

Form.propTypes = {
  value: PropTypes.number,
  description: PropTypes.string,
  currency: PropTypes.number,
  payment: PropTypes.string,
  tag: PropTypes.string,
  currencies: PropTypes.arrayOf(PropTypes.string),
  onChange: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps, null)(Form);
