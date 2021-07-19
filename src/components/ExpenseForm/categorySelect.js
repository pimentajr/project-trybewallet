import React, { Component } from 'react';

class CategorySelect extends Component {
  render() {
    return (
      <label htmlFor="expense-category">
        Tag
        <select id="expense-category">
          <option>
            Alimentação
          </option>
          <option>
            Lazer
          </option>
          <option>
            Trabalho
          </option>
          <option>
            Transporte
          </option>
          <option>
            Saúde
          </option>
        </select>
      </label>
    );
  }
}

export default CategorySelect;
