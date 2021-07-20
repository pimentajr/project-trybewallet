import React, { Component } from 'react';

export default class DescriptionInput extends Component {
  render() {
    return (
      <label htmlFor="description">
        Descrição
        <textarea name="description" id="description" />
      </label>
    );
  }
}
