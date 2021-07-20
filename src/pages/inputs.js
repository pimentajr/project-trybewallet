import React from 'react';
import PropTypes from 'prop-types';

export default class inputs extends React.Component {
  render() {
    const { handleChange } = this.props;
    return (
      <div>
        <label htmlFor="valor">
          Valor:
          <input
            type="text"
            name="valor"
            id="valor"
            onChange={ handleChange }
          />
        </label>
        <label htmlFor="descricao">
          Descrição:
          <input
            type="text"
            name="descricao"
            id="descricao"
            onChange={ handleChange }
          />
        </label>
      </div>
    );
  }
}

inputs.propTypes = {
  handleChange: PropTypes.func,
}.isRequired;
