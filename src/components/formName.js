import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class FormName extends Component {
  render() {
    const { onChang } = this.props;
    return (
      <>
        <label htmlFor="valor">
          Valor
          <input type="number" name="value" id="valor" onChange={ (e) => onChang(e) } />
        </label>
        <label htmlFor="Descrição">
          Descrição:
          <input
            type="text"
            name="description"
            id="Descrição"
            onChange={ (e) => onChang(e) }
          />
        </label>
      </>
    );
  }
}

FormName.propTypes = {
  onChang: PropTypes.func,
}.isRequired;
