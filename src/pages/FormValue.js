import React, { Component } from 'react';
import PropTypes from 'prop-types';

class FormValue extends Component {
  render() {
    const { value, handleChanges } = this.props;
    return (
      <label htmlFor="value">
        Valor
        <input
          type="text"
          name="value"
          value={ value }
          id="value"
          onChange={ handleChanges }
        />
      </label>
    );
  }
}

export default FormValue;

FormValue.propTypes = ({
  value: PropTypes.string.isRequired,
  handleChanges: PropTypes.func.isRequired,
});
