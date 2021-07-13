import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Descricao extends Component {
  render() {
    const { description, handleInput } = this.props;
    return (
      <label htmlFor="description">
        Descrição:
        <input
          data-testid="description-input"
          type="text"
          id="description"
          name="description"
          onChange={ handleInput }
          value={ description }
        />
      </label>
    );
  }
}

Descricao.propTypes = {
  description: PropTypes.string,
  handleInput: PropTypes.func,
}.isRequired;
