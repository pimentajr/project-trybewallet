import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CategoryTagExpense extends Component {
  render() {
    const { myValue } = this.props;
    const { tag, funcHandleState } = myValue;
    return (
      <label htmlFor="tag">
        Tag
        <select id="tag" name="tag" value={ tag } onChange={ funcHandleState }>
          <option name="tag" value="Alimentação">Alimentação</option>
          <option name="tag" value="Lazer">Lazer</option>
          <option name="tag" value="Trabalho">Trabalho</option>
          <option name="tag" value="Transporte">Transporte</option>
          <option name="tag" value="Saúde">Saúde</option>
        </select>
      </label>
    );
  }
}

CategoryTagExpense.propTypes = {
  myValue: PropTypes.func.isRequired,
};

export default CategoryTagExpense;
