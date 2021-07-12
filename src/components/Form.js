import React, { useEffect } from 'react'
import { connect } from 'react-redux'

export const Form = (props) => {
  const { wallet } = props;
  const { currencies } = wallet;

  return (
    <form className="Form" action="#">
      <label htmlFor="form-value">
        Valor:
        <input type="text" name="Valor" id="form-value" />
      </label>

      <label htmlFor="form-description">
        Descrição:
        <input type="text" name="Descrição" id="form-description" />
      </label>

      <label htmlFor="form-currency">
        Moeda:
        <select id="form-currency" name="Moeda" >
          {currencies.map((currency) => (
            <option key={ currency }>{ currency }</option>
          ))}
        </select>
      </label>

      <label htmlFor="form-pay-method">
        Método de pagamento:
        <select id="form-pay-method" name="Pagamento">
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
        </select>
      </label>

      <label htmlFor="form-category">
        Tag:
        <select id="form-category" name="Categoria">
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
        </select>
      </label>

    </form>
  )
}

const mapStateToProps = (state) => state;

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(Form)
