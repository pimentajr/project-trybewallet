import React from 'react';
import PropTypes from 'prop-types';

class ExpensesSelects extends React.Component {
  render() {
    const { onChange } = this.props;
    return (
      <>
        <label htmlFor="pgt">
          Método de pagamento:
          <select id="pgt" name="method" onChange={ onChange }>
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>

        <label htmlFor="tag">
          Tag:
          <select id="tag" name="tag" onChange={ onChange }>
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
      </>
    );
  }
}

ExpensesSelects.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default ExpensesSelects;
