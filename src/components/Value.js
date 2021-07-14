import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Value extends Component {
  render() {
    const { handlerChange, value } = this.props;
    return (
      <label htmlFor="valor">
        Valor:
        <input
          id="valor"
          name="value"
          type="number"
          value={ value }
          onChange={ handlerChange }
        />
      </label>

    );
  }
}

export default Value;

Value.propTypes = {
  handlerChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};
