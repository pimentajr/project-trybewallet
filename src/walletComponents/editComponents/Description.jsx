import React, { Component } from 'react';

export default class Description extends Component {
  render() {
    const { description, handlerChange } = this.props;

    return (
      <label htmlFor="description">
        Descrição
        <input
          name="description"
          id="description"
          type="text"
          value={ description }
          onChange={ (e) => handlerChange(e) }
        />
      </label>
    );
  }
}
