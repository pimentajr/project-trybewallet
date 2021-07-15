import React from 'react';
import PropTypes from 'prop-types';

class Select extends React.Component {
  render() {
    const { handleChange, value, options, name, id, label, testid } = this.props;
    return (
      <label
        htmlFor={ id }
      >
        { label }
        <select
          name={ name }
          onChange={ handleChange }
          value={ value }
          id={ id }
          data-testid={ testid }
        >
          { options.map((option) => (
            <option
              key={ `${name}-${option}` }
            >
              { option }
            </option>
          )) }
        </select>
      </label>
    );
  }
}

Select.propTypes = {
  handleChange: PropTypes.func,
  value: PropTypes.string,
  options: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.string,
  label: PropTypes.string,
  testid: PropTypes.string,
}.isRequired;

export default Select;
