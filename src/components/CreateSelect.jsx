import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class CreateSelect extends Component {
  render() {
    const { name,
      label,
      options,
      value,
      handleChange,
      dataTestid } = this.props;

    return (
      <label htmlFor={ name }>
        { label }
        <select
          data-testid={ dataTestid }
          id={ name }
          name={ name }
          onChange={ handleChange }
          value={ value }
        >
          { options.map((item) => <option key={ item } value={ item }>{ item }</option>)}
        </select>
      </label>
    );
  }
}

CreateSelect.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.string),
  value: PropTypes.string,
  handleChange: PropTypes.func,
}.isRequired;
