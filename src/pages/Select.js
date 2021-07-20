import React from 'react';
import PropTypes from 'prop-types';

export default class Select extends React.Component {
  render() {
    const { handleChange } = this.props;
    return (
      <div>
        <label htmlFor="pagamento">
          Método de pagamento:
          <select
            name="pagamento"
            id="pagamento"
            onChange={ handleChange }
          >
            <option value="Dinheiro"> </option>
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="pagamento">
          Tag:
          <select name="tag" id="pagamento" onChange={ handleChange }>
            <option value="" selected> </option>
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
      </div>
    );
  }
}

Select.propTypes = {
  handleChange: PropTypes.func,
}.isRequired;
