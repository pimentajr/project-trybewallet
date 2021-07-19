import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CategorySelect extends Component {
  constructor(props) {
    super();
    const { categories } = props;
    this.state = ({
      category: categories[0],
    });
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect({ target }) {
    this.setState(() => ({
      category: target.value,
    }));
  }

  render() {
    const { categories } = this.props;
    const { category } = this.state;
    return (
      <label htmlFor="expense-category">
        Tag
        <select
          id="expense-category"
          value={ category }
          onChange={ (e) => this.handleSelect(e) }
        >
          {categories.map((currCategory, index) => (
            <option value={ currCategory } key={ index }>
              {currCategory}
            </option>))}
        </select>
      </label>
    );
  }
}

CategorySelect.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default CategorySelect;
