import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CategorySelect extends Component {
  render() {
    const { tags, handleChange } = this.props;
    return (
      <label htmlFor="expense-category">
        Tag
        <select
          id="expense-category"
          name="tag"
          // value={ category }
          onChange={ (e) => handleChange(e) }
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
};

export default CategorySelect;
