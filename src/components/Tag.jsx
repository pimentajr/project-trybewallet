import React, { Component } from 'react';

export default class Tag extends Component {
  render() {
    return (
      <label htmlFor="tag">
        Tag:
        <select id="tag">
          <option value="food">Alimentação</option>
          <option value="laze">Lazer</option>
          <option value="work">Trabalho</option>
          <option value="transport">Transporte</option>
          <option value="health">Saúde</option>
        </select>
      </label>
    );
  }
}
