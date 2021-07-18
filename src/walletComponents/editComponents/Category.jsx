import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Category extends Component {
  render() {
    const { handlerChange, tag } = this.props;
    return (
      <label htmlFor="category">
        Tag
        <select
          name="tag"
          id="category"
          value={ tag }
          data-testid="tag-input"
          onChange={ (e) => handlerChange(e) }
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

Category.propTypes = {
  handlerChange: PropTypes.func.isRequired,
  tag: PropTypes.string.isRequired,
};
