import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Tag extends Component {
  render() {
    const categories = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
    const { handleChange, tag } = this.props;
    return (
      <label htmlFor="tag">
        Tag:
        <select
          data-testid="tag-input"
          name="tag"
          id="tag"
          onChange={ handleChange }
          value={ tag }
        >
          {categories.map((category, key) => (
            <option key={ key } value={ category }>
              { category }
            </option>
          ))}
        </select>
      </label>
    );
  }
}

Tag.propTypes = {
  handleChange: PropTypes.func.isRequired,
  tag: PropTypes.string.isRequired,
};

export default Tag;
