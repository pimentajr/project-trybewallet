import React from 'react';
import PropTypes from 'prop-types';

export default function MetodoPagamento({ handleChange, inputFormW }) {
  return (
    <>
      <label htmlFor="payment">
        Método de pagamento
        <select
          onChange={ handleChange }
          value={ inputFormW.payment }
          id="payment"
          name="payment"
        >
          <option value="dinheiro">Dinheiro</option>
          <option value="cartao-credito">Cartão de crédito</option>
          <option value="cartao-debito">Cartão de débito</option>
        </select>
      </label>
      <label htmlFor="tag">
        Tag
        <select onChange={ handleChange } value={ inputFormW.tag } id="tag" name="tag">
          <option value="alimentacao">Alimentação</option>
          <option value="lazer">Lazer</option>
          <option value="trabalho">Trabalho</option>
          <option value="transporte">Transporte</option>
          <option value="saude">Saúde</option>
        </select>
      </label>
    </>
  );
}

MetodoPagamento.propTypes = {
  handleChange: PropTypes.func.isRequired,
  inputFormW: PropTypes.objectOf(PropTypes.any).isRequired,
};
