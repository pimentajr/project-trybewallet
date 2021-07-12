import React from 'react';
import PropTypes from 'prop-types';

class Pagamento extends React.Component {
  render() {
    const { inputValue } = this.props;
    const methodsPay = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    return (
      <label htmlFor="Método de pagamento">
        Método de pagamento
        <select
          name="method"
          id="Método de pagamento"
          onChange={ inputValue }
        >
          { methodsPay.map((method, index) => (
            <option key={ index }>{ method }</option>)) }
        </select>
      </label>
    );
  }
}

Pagamento.propTypes = {
  inputValue: PropTypes.string,
}.isRequired;

export default Pagamento;
