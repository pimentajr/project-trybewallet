import React, { Component } from 'react';

class DescriptionToAdd extends Component {
  render() {
    return (
      <label htmlFor="descricao">
        Descrição
        <input
          type="text"
          id="descricao"
        />
      </label>
    );
  }
}

export default DescriptionToAdd;
