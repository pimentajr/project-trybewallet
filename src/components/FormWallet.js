import React from 'react';
import PropTypes from 'prop-types';
import MetodoPagamento from './MetodoPagamento';

function FormWallet({ currencies, handleChange, inputFormW, handleSubmit }) {
  return (
    <form onSubmit={ handleSubmit }>
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
      <label htmlFor="currency">
        Moeda
        <select
          id="currency"
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
      <button type="submit">Adicionar despesa</button>
    </form>
  );
}

FormWallet.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.any).isRequired,
  inputFormW: PropTypes.objectOf(PropTypes.any).isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default FormWallet;
