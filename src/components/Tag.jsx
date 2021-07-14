import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Tag extends Component {
  render() {
    const { tag, handleInput } = this.props;
    return (
      <label htmlFor="tag">
        Tag:
        <select
          data-testid="tag-input"
          name="tag"
          id="tag"
          onChange={ handleInput }
          value={ tag }
        >
          <option value="Alimentação">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>
        </select>
      </label>
    );
  }
}

Tag.propTypes = {
  tag: PropTypes.string,
  handleInput: PropTypes.func,
}.isRequired;
