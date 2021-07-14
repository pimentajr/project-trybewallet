import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Value extends Component {
  render() {
    const { value, handleEvent } = this.props;
    return (
      <label htmlFor="value">
        Valor:
        <input
          id="value"
          type="text"
          name="value"
          value={ value }
          onChange={ handleEvent }
        />
      </label>
    );
  }
}

Value.propTypes = {
  value: PropTypes.string.isRequired,
  handleEvent: PropTypes.func.isRequired,
};

export default Value;
