import React from 'react';
import PropTypes from 'prop-types';
import MetodoPagamento from './MetodoPagamento';

function FormWallet({ currencies, handleChange, inputFormW }) {
  return (
    <form>
      <label htmlFor="valor">
        Valor
        <input
          onChange={ handleChange }
          value={ inputFormW.valor }
          type="number"
          id="valor"
          name="valor"
        />
      </label>
      <label htmlFor="desc">
        Descrição
        <input
          onChange={ handleChange }
          value={ inputFormW.desc }
          type="text"
          id="desc"
          name="desc"
        />
      </label>
      <label htmlFor="input-select-coin">
        Moeda
        <select
          id="input-select-coin"
          name="currency"
          onChange={ handleChange }
          value={ inputFormW.currency }
        >
          {Object.keys(currencies).map((item, idx) => (
            <option value={ item } key={ idx }>{ item }</option>
          ))}
        </select>
      </label>
      <MetodoPagamento handleChange={ handleChange } inputFormW={ inputFormW } />
    </form>
  );
}

FormWallet.propTypes = {
  currencies: PropTypes.objectOf(PropTypes.any).isRequired,
  handleChange: PropTypes.func.isRequired,
  inputFormW: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default FormWallet;
