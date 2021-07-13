import React, { Component } from 'react';

export default class Category extends Component {
  render() {
    const { handlerChange, category} = this.props;
    return (
      <label htmlFor="category">
        Tag
        <select
          name="tag"
          id="category"
          value={ category }
          onClick={ (e) => handlerChange(e) }
        >
          <option>Alimentação</option>
          <option>Lazer</option>
          <option>Trabalho</option>
          <option>Transporte</option>
          <option>Saúde</option>
        </select>
      </label>
    );
  }
}
