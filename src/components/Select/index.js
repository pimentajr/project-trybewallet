import React from 'react';
import PropTypes from 'prop-types';

export default class Select extends React.Component {
  render() {
    const { onChange, options, ...attributes } = this.props;
    const { id } = attributes;

    return (
      <select name={ id } onChange={ ({ target }) => onChange(target) } { ...attributes }>
        {
          options.map((option, index) => (
            <option key={ index } value={ option.value }>{ option.label }</option>
          ))
        }
      </select>
    );
  }
}

Select.propTypes = {
  id: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  options: PropTypes.arrayOf(PropTypes.object),
}.isRequired;
