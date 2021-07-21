import React, { Component } from 'react';

class ValueToAdd extends Component {
  render() {
    return (
      <label htmlFor="valor">
        Valor
        <input
          type="number"
          id="valor"
        />
      </label>
    );
  }
}

export default ValueToAdd;
