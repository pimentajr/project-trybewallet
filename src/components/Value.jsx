import React, { Component } from 'react';

export default class Value extends Component {
  render() {
    return (
      <label htmlFor="value">
        Valor:
        <input type="text" id="value" />
      </label>
    );
  }
}
