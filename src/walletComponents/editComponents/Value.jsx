import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Value extends Component {
  render() {
    const { value, handlerChange } = this.props;
    return (
      <label htmlFor="expenses">
        Valor
        <input
          data-testid="value-input"
          name="value"
          id="expenses"
          type="number"
          value={ value }
          onChange={ (e) => handlerChange(e) }
        />
      </label>
    );
  }
}

Value.propTypes = {
  value: PropTypes.number.isRequired,
  handlerChange: PropTypes.func.isRequired,
};
