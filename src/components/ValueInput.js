import React, { Component } from 'react';

class ValueInput extends Component {
  render() {
    return (
      <label htmlFor="value">
        Valor
        <input type="number" name="value" id="value" />
      </label>
    );
  }
}

export default ValueInput;
