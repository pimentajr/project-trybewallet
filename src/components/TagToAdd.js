import React, { Component } from 'react';

class TagToAdd extends Component {
  render() {
    return (
      <label htmlFor="tag">
        Tag
        <select
          id="tag"
        >
          <option
            value="alimentação"
          >
            Alimentação
          </option>
          <option
            value="Lazer"
          >
            Lazer
          </option>
          <option
            value="Trabalho"
          >
            Trabalho
          </option>
          <option
            value="Transporte"
          >
            Transporte
          </option>
          <option
            value="Saúde"
          >
            Saúde
          </option>
        </select>
      </label>
    );
  }
}

export default TagToAdd;
