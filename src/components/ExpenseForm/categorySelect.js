import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CategorySelect extends Component {
  render() {
    const { tags, handleChange, value } = this.props;
    return (
      <label htmlFor="expense-category">
        Tag
        <select
          id="expense-category"
          data-testid="tag-input"
          name="tag"
          onChange={ (e) => handleChange(e) }
          value={ value }
        >
          {tags.map((currCategory, index) => (
            <option value={ currCategory } key={ index }>
              {currCategory}
            </option>))}
        </select>
      </label>
    );
  }
}

CategorySelect.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default CategorySelect;
