import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Valor extends Component {
  render() {
    const { value, handleInput } = this.props;
    return (
      <label htmlFor="value">
        Valor:
        <input
          data-testid="value-input"
          type="text"
          name="value"
          id="value"
          onChange={ handleInput }
          value={ value }
        />
      </label>
    );
  }
}

Valor.propTypes = {
  value: PropTypes.string,
  handleInput: PropTypes.func,
}.isRequired;
