import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ValueInput extends Component {
  render() {
    const { funcHandleChange } = this.props;
    return (
      <label htmlFor="value">
        Valor
        <input type="number" name="value" id="value" onChange={ funcHandleChange } />
      </label>
    );
  }
}

ValueInput.propTypes = {
  funcHandleChange: PropTypes.func,
}.isRequired;
