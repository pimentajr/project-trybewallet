import React, { Component } from 'react';
import PropTypes from 'prop-types';

class InputsLabels extends Component {
  render() {
    const { handleChange, value, description } = this.props;
    return (
      <>
        <label htmlFor="expense-value">
          Valor
          <input
            type="number"
            name="value"
            id="expense-value"
            data-testid="value-input"
            value={ value }
            onChange={ (e) => handleChange(e) }
          />
        </label>
        <label htmlFor="expense-description">
          Descrição
          <input
            type="text"
            name="description"
            id="expense-description"
            data-testid="description-input"
            value={ description }
            onChange={ (e) => handleChange(e) }
          />
        </label>
      </>
    );
  }
}

InputsLabels.propTypes = {
  handleChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default InputsLabels;
