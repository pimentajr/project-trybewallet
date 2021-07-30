import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Value extends Component {
  render() {
    const { handleChange, value } = this.props;
    return (
      <label htmlFor="value">
        Valor
        <input
          type="number"
          name="value"
          id="value"
          data-testid="value-input"
          onChange={ handleChange }
          value={ value }
        />
      </label>
    );
  }
}

Value.propTypes = {
  handleChange: PropTypes.func.isRequired,
  value: PropTypes.number.isRequired,
};

export default Value;
