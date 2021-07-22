import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CategoryForm extends Component {
  render() {
    const { onChangeOption } = this.props;
    return (
      <label htmlFor="category">
        Tag:
        <select name="category" id="category" onChange={ (op) => onChangeOption(op) }>
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

CategoryForm.propTypes = {
  onChangeOption: PropTypes.func,
}.isRequired;

export default CategoryForm;
