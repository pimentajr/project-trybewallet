import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Value extends Component {
  render() {
    const { value, onChange } = this.props;
    return (
      <div>
        <label htmlFor="value">
          Valor
          <input
            type="text"
            name="value"
            id="value"
            value={ value }
            onChange={ onChange }
          />
        </label>
      </div>
    );
  }
}

Value.propTypes = ({
  value: PropTypes.number,
  onChange: PropTypes.func,
}).isRequired;

export default Value;
